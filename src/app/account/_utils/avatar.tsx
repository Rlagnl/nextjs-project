import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";

export async function downloadImage(supabase: SupabaseClient, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }
    return URL.createObjectURL(data);
  } catch (error) {
    console.log("Error downloading image: ", error);
    return null;
  }
}
export function useUploadAvatar(
  uid: string | null,
  supabase: SupabaseClient,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  onUpload: (url: string) => void,
) {
  return async (event: React.ChangeEvent<HTMLInputElement, Element>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };
}
