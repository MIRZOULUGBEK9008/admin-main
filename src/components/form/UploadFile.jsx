"use client";
import {
  CheckCircledIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/zustand";
import { allowImageSize, warnMessages } from "@/constants";
import { toast } from "sonner";

export default function UploadFile() {
  const { setGCoverImage, gCoverImage } = useAppStore();
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleReset() {
    setGCoverImage(null);
  }

  function handleChange(e) {
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    if (file?.size > allowImageSize) {
      toast.warning(warnMessages.length.cover);
    } else {
      setGCoverImage(file);
    }
  }

  return (
    <div>
      <div className="grid w-full items-center gap-1.5 ">
        <Label htmlFor="cover">Rasm uchun havola*</Label>
        <div className="flex gap-3">
          {gCoverImage === null ? (
            <Button onClick={handleClick} type="button">
              <UploadIcon /> Rasm yuklash
            </Button>
          ) : (
            <Button variant="secondary" type="button">
              <CheckCircledIcon /> Rasm yuklangan
            </Button>
          )}
          {gCoverImage && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="icon"
              type="button"
            >
              <UpdateIcon />
            </Button>
          )}
        </div>

        <input
          onChange={handleChange}
          className="sr-only"
          ref={inputRef}
          type="file"
          accept=".jpeg, .jpg, .png"
        />
      </div>
    </div>
  );
}
