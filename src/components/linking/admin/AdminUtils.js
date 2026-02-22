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

  // Destructure the Supabase response
  const { data, error } = await supabase.functions.invoke("admin-action", {
    headers: { Authorization: `Bearer ${token}` },
    body: { action, table, data: payload, id },
  });

  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);

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
