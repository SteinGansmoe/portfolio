import { supabase } from "@/lib/supabaseClient";

function getFileExt(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "png";
}

export async function uploadProjectImage(file: File) {
  const ext = getFileExt(file.name);
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const path = `projects/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}
