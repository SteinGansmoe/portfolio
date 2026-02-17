import { supabase } from "@/lib/supabaseClient";

function getFileExt(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "png";
}

export async function uploadProjectImages(files: File[]) {
  const uploaded: string[] = [];

  for (const file of files) {
    const ext = getFileExt(file.name);
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const path = `projects/${fileName}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    uploaded.push(data.publicUrl);
  }

  return uploaded;
}
