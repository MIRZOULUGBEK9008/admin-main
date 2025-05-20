"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImage from "/public/dark-logo.svg";
import { useAppStore } from "@/lib/zustand";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { successMessages } from "@/constants";

export default function Header() {
  const { setAdmin } = useAppStore();
  const router = useRouter();

  function handleClick() {
    const confirm = window?.confirm("Tizimni tark etmoqchimisiz?");
    if (confirm) {
      setAdmin(null);
      window?.localStorage.removeItem("admin");
      router.replace("/login");
      toast.info(successMessages.logout);
    }
  }

  return (
    <header className="py-5">
      <div className="base-container flex items-center justify-between">
        <Image
          className="w-[170px]"
          src={logoImage}
          alt="chizlab.uz logo"
          priority
          width="170"
          height="40"
        />
        <Button onClick={handleClick}>
          <ExitIcon />
          Chiqish
        </Button>
      </div>
    </header>
  );
}
