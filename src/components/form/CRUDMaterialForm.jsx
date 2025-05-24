"use client";
import { errorMessages, form } from "@/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KeywordsInput from "./KeywordsInput";
import AuthoursInput from "./AuthorsInput";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { getFormData, validate } from "@/lib/utils";
import { useAppStore } from "@/lib/zustand";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Edit, Loader2 } from "lucide-react";
import { addData, updateData, uploadFile } from "@/requests";
import UploadFile from "./UploadFile";
import { useRouter } from "next/navigation";

export default function CRUDMaterialForm({ edited }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const {
    gAuthors,
    gKeywords,
    gCoverImage,
    admin,
    updateMaterial,
    setCrudDrawer,
    setMaterials,
    setAdmin,
  } = useAppStore();

  // Reset
  function reset() {
    formRef?.current?.reset();
  }

  // Add data
  async function send(data) {
    setLoading(true);
    let changeFileToLink = null;
    try {
      changeFileToLink = await uploadFile(data.cover);
    } catch {
      changeFileToLink = null;
    }
    data.cover = changeFileToLink;
    addData("/materials", data, admin.access_token)
      .then(({ message, data }) => {
        setMaterials(data, "one");
        toast.success(message);
        setCrudDrawer(null);
      })
      .catch(({ message }) => {
        if (message === errorMessages[403]) {
          setAdmin(null);
          router.push("/login");
          localStorage.removeItem("user");
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Edit data
  function edit(data) {
    setLoading(true);
    updateData("/materials/", data, admin.access_token)
      .then(({ message, data }) => {
        updateMaterial(data);
        toast.success(message);
        setCrudDrawer(null);
      })
      .catch(({ message }) => {
        if (message === errorMessages[403]) {
          setAdmin(null);
          router.push("/login");
          localStorage.removeItem("user");
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const result = {
      ...getFormData(e.target),
      authors: gAuthors,
      keywords: gKeywords,
      cover: gCoverImage,
      id: edited?.id,
    };

    const checkedResult = validate(result, "form");

    if (!checkedResult) {
      if (edited) {
        edit(result);
      } else {
        send(result);
      }
    } else {
      const { target, message } = checkedResult;
      toast.warning(message);
      e.target[target]?.focus();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex flex-col pl-1 pr-5 gap-y-6"
    >
      <div className="grid grid-cols-3 gap-x-5 gap-y-6">
        {/* Title  */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Sarlavha*</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={edited?.title}
            placeholder="Sarlavhani kiriting"
          />
        </div>
        {/* Volume  */}
        <div className="grid w-full items-center gap-1.5 col-start-2 col-end-4">
          <Label htmlFor="volume">Sahifalar soni*</Label>
          <Input
            type="number"
            id="volume"
            name="volume"
            min="1"
            defaultValue={edited?.volume}
            placeholder="Sahifalar sonini kiriting"
          />
        </div>

        {/* Published At */}
        <Label className="grid w-full items-start gap-1.5 col-start-1 col-end-3">
          <span>Chop etilgan yil*</span>
          <Select name="publishedAt" defaultValue={edited?.publishedAt}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chop etilgan yilni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.publishedAt.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>

        {/* Country */}
        <Label className="grid w-full items-start gap-1.5">
          <span>Davlat*</span>
          <Select name="country" defaultValue={edited?.country}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Davlatni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>

        {/* Language */}
        <Label className="grid w-full items-start gap-1.5 col-start-1 col-end-4">
          <span>Til*</span>
          <Select name="language" defaultValue={edited?.language}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tilni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>

        {/* Cover */}
        <UploadFile edited={edited?.cover} />

        {/* Resource type */}
        <Label className="grid w-full items-start gap-1.5 col-start-1 col-end-3">
          <span>Resurs turi*</span>
          <Select name="resourceType" defaultValue={edited?.resourceType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Resurs turini tanlang" />
            </SelectTrigger>
            <SelectContent>
              {form.resourceTypes.map((resourceType) => (
                <SelectItem key={resourceType} value={resourceType}>
                  {resourceType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>

        {/* Source */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="source">Manbaa*</Label>
          <Input
            type="text"
            id="source"
            name="source"
            defaultValue={edited?.source}
            placeholder="Manbaa uchun havolanini kiriting"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Keywords */}
        <KeywordsInput edited={edited?.keywords} />

        {/* Authors */}
        <AuthoursInput edited={edited?.authors} />

        {/* Summary */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="summary">Tavsif*</Label>
          <Textarea
            className="min-h-24"
            placeholder="Material uchun tavsif yozing..."
            id="summary"
            name="summary"
            defaultValue={edited?.summary}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={() => {
            reset();
            setCrudDrawer(null);
          }}
          type="reset"
          variant="outline"
        >
          Bekor qilish
        </Button>

        <Button disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              {edited ? "Tahrirlanmoqda..." : "Qo'shilmoqda..."}
            </>
          ) : (
            <>
              {edited ? (
                <>
                  <Edit />
                  Tahrirlash
                </>
              ) : (
                <>
                  <BookmarkIcon />
                  Saqlash
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
