"use client";
import {
  CheckCircledIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/zustand";
import { allowImageSize, warnMessages } from "@/constants";
import { toast } from "sonner";
import { Eye } from "lucide-react";

export default function UploadFile({ edited }) {
  const { setGCoverImage, gCoverImage } = useAppStore();
  const inputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      setGCoverImage(edited);
    }
  }, []);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleReset() {
    setGCoverImage(null);
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file?.size > allowImageSize) {
      toast.warning(warnMessages.length.cover);
    } else {
      setGCoverImage(file);
    }
  }

  function handleShow() {
    let src = null;
    if (gCoverImage instanceof File) {
      src = URL.createObjectURL(gCoverImage);
    }
    if (edited) {
      src = edited;
    }
    if (src) {
      window.open(src);
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
          {gCoverImage && !edited && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="icon"
              type="button"
            >
              <UpdateIcon />
            </Button>
          )}
          {gCoverImage && (
            <Button onClick={handleShow} size="icon" type="button">
              <Eye />
            </Button>
          )}
        </div>

        <input
          onChange={handleChange}
          className="sr-only"
          ref={inputRef}
          type="file"
          id="cover"
          accept=".jpeg, .jpg, .png"
        />
      </div>
    </div>
  );
}
