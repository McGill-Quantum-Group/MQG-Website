import { supabase } from "../../supabaseConfig";
import { getAuth } from "firebase/auth";

// Authenticate with firebase for edge functions
export const secureDbRequest = async (
  action,
  table,
  payload = null,
  id = null,
) => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Not authenticated with Firebase");

  // Direct fetch to bypass supabase-js header handling
  const SUPABASE_URL = "https://inqvyfirgvrhxniawlzq.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucXZ5ZmlyZ3ZyaHhuaWF3bHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NjY2OTgsImV4cCI6MjA4NTQ0MjY5OH0.UAfeDCDklcRob9IBRHedQ7H0g4tFMMgtXT0EhtZ7plk";

  const res = await fetch(`${SUPABASE_URL}/functions/v1/admin-action`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "x-firebase-token": token,
    },
    body: JSON.stringify({ action, table, data: payload, id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Edge Function error: ${res.status}`);

  return data;
};

// Make sure not anyone can upload
export const secureImageUpload = async (bucket, folderPath, file) => {
  const filePath = `${folderPath}/${Date.now()}_${file.name}`;

  const signedUrlData = await secureDbRequest(
    "get_upload_url",
    bucket,
    filePath,
  );

  const { error } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(filePath, signedUrlData.token, file);

  if (error) {
    throw new Error("Failed to upload file to signed URL: " + error.message);
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};

export const secureDeleteRecord = async (table, id) => {
  return await secureDbRequest("delete", table, null, id);
};
