"use client";
import { Edit2, Eye, Loader2Icon, TrashIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";
import { useAppStore } from "@/lib/zustand";
import { deleteData } from "@/requests";
import { errorMessages } from "@/constants";
import { useState } from "react";
import CRUDMaterialForm from "./form/CRUDMaterialForm";

export function DeleteButton({ id }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { admin, setAdmin, deleteMaterial } = useAppStore();

  function handleDelete(id) {
    const confirmation = confirm("Rostan o'chirib yubormoqchimisiz?");
    if (confirmation) {
      setDeleteLoading(true);
      deleteData("/materials/", id, admin.access_token)
        .then(({ message }) => {
          toast.success(message);
          deleteMaterial(id);
        })
        .catch(({ message }) => {
          if (message === errorMessages[403]) {
            setAdmin(null);
            localStorage.removeItem("admin");
            redirect("/login");
          }
          toast.error(message);
        })
        .finally(() => {
          setDeleteLoading(false);
        });
    }
  }
  return (
    <TooltipProvider delayDuration="0">
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            handleDelete(id);
          }}
          className={buttonVariants({
            variant: "destructive",
            size: "icon",
          })}
          disabled={deleteLoading}
        >
          {deleteLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>O'chirish</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ReadButton({ id }) {
  function handleRead(id) {
    window.open(`https://chizlab.uz/${id}`);
  }
  return (
    <TooltipProvider delayDuration="0">
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            handleRead(id);
          }}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <Eye />
        </TooltipTrigger>
        <TooltipContent>
          <p>Ko'rish</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function EditButton({ id }) {
  const { setCrudDrawer, materials } = useAppStore();
  function handleDrawer(id) {
    const updatingMaterial = materials.find((el) => el.id === id);
    setCrudDrawer({
      title: `${id}-idga ega materialni tahrirlash`,
      description: "Tahrirlash orqali materiallarni to'g'rilashingiz mumkin",
      width: 80,
      children: <CRUDMaterialForm edited={updatingMaterial} />,
    });
  }
  return (
    <TooltipProvider delayDuration="0">
      <Tooltip>
        <TooltipTrigger
          className={buttonVariants({
            variant: "secondary",
            size: "icon",
          })}
          onClick={() => handleDrawer(id)}
        >
          <Edit2 />
        </TooltipTrigger>
        <TooltipContent>
          <p>Tahrirlash</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
