"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@lib/supabase/client";
import { Button } from "@components/ui/button";
import { downloadImage, useUploadAvatar } from "@/account/_utils/avatar";

interface IAvatarProps {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}

export default function Avatar(props: IAvatarProps) {
  const { uid, url, size, onUpload } = props;
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) {
      downloadImage(supabase, url).then((url) => {
        setAvatarUrl(url);
      });
    }
  }, [url, supabase]);

  const uploadAvatar = useUploadAvatar(uid, supabase, setUploading, onUpload);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative overflow-hidden rounded-full bg-muted ring-2 ring-border"
        style={{ height: size, width: size }}
      >
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <svg
              className="h-1/2 w-1/2 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => document.getElementById("single")?.click()}
        >
          {uploading ? "上传中..." : "上传头像"}
        </Button>
        <input
          className="hidden"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
