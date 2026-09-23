"use client";

import { useState } from "react";
import { User, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadProfilePic } from "@/app/actions/profile";

export function AvatarUploader({ initialImage, ownerName }: { initialImage?: string, ownerName?: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProfilePic(formData);
      if (res.success) {
        setImageUrl(res.imageUrl);
      }
    } catch (err: any) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-24 h-24 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-3xl font-bold text-indigo-500 group cursor-pointer overflow-hidden">
      {imageUrl ? (
        <Image src={imageUrl} alt="Profile" fill className="object-cover" />
      ) : ownerName ? (
        <span className="uppercase text-4xl text-indigo-400 font-black">{ownerName.charAt(0)}</span>
      ) : (
        <User className="w-10 h-10" />
      )}
      
      {/* Upload Overlay */}
      <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10">
        {isUploading ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <Camera className="w-6 h-6 text-white" />
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
