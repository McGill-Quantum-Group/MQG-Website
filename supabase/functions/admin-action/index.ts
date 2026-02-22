// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/** Parse a Supabase storage public URL into bucket and path for removal */
function parseStoragePublicUrl(url: string): { bucket: string; path: string } | null {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
  if (!match) return null;
  return { bucket: match[1], path: match[2] };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    const idToken = authHeader?.replace("Bearer ", "");
    if (!idToken) throw new Error("Unauthorized: No token provided");

    // Verify token with Google (using the Firebase Key)
    const firebaseKey = Deno.env.get("FIREBASE_WEB_API_KEY");
    const verifyRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseKey}`, {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
    const googleData = await verifyRes.json();
    const userEmail = googleData.users?.[0]?.email;

    // Admin logic
    const adminString = Deno.env.get("ADMIN_EMAILS") || "[]";
    const admins = JSON.parse(adminString);

    if (!admins.includes(userEmail)) {
      throw new Error("Forbidden: You are not an admin.");
    }

    // Connect to DB with "God Mode" (Service Role Key)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Extract data from React
    const reqBody = await req.json();
    const action = reqBody.action;
    const table = reqBody.table;
    let data = reqBody.data;
    
    // Fallback: If 'id' isn't at the root, check if the frontend nested it inside 'data'
    const targetId = reqBody.id || (data && data.id);

    // Strip the ID out of the data object so we don't attempt to UPDATE the primary key column
    if (data && data.id) {
      delete data.id;
    }

    // 1. Handle Storage Signed URL Request
    if (action === "get_upload_url") {
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from(table)
        .createSignedUploadUrl(data);

      if (uploadError) throw new Error(uploadError.message);

      return new Response(JSON.stringify(uploadData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 2. Handle Database Changes
    let result;
    if (action === "insert") result = await supabaseAdmin.from(table).insert(data).select();

    if (action === "delete") {
      // 1. Fetch the ENTIRE row to scan it, regardless of the table name
      const { data: row } = await supabaseAdmin
        .from(table)
        .select("*")
        .eq("id", targetId)
        .single();

      if (row) {
        const byBucket: Record<string, string[]> = {};
        
        // Helper to parse and queue a URL
        const addIfUrl = (val: any) => {
          if (typeof val === "string") {
            const parsed = parseStoragePublicUrl(val);
            if (parsed) {
              if (!byBucket[parsed.bucket]) byBucket[parsed.bucket] = [];
              byBucket[parsed.bucket].push(parsed.path);
            }
          }
        };

        // 2. Iterate blindly over every column in the row
        Object.values(row).forEach((value) => {
          if (Array.isArray(value)) {
            // Handle columns like 'images' (array of strings)
            value.forEach(addIfUrl);
          } else {
            // Handle columns like 'spotlight_image' (single string)
            addIfUrl(value);
          }
        });

        // 3. Execute bulk deletions for any buckets we found
        for (const [bucket, paths] of Object.entries(byBucket)) {
          if (paths.length > 0) {
            const { error: storageError } = await supabaseAdmin.storage
              .from(bucket)
              .remove(paths);
            if (storageError) {
              console.error(`Storage delete failed for ${bucket}:`, storageError.message);
            }
          }
        }
      }
      
      // 4. Finally, delete the database row
      result = await supabaseAdmin.from(table).delete().eq("id", targetId);
    }

    if (action === "update") result = await supabaseAdmin.from(table).update(data).eq("id", targetId);

    if (!result) throw new Error("Invalid action provided");
    if (result.error) throw new Error(result.error.message);

    return new Response(JSON.stringify(result.data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/admin-action' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
