"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { useEffect } from "react";
import TableData from "@/components/TableData";
import Header from "@/components/Header";
import UniversalDrawer from "@/components/UniversalDrawer";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import AddMaterialForm from "@/components/form/AddMaterialForm";

export default function page() {
  const { admin, setAddItemDrawer, setAdmin } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = JSON.parse(localStorage.getItem("admin")) || admin;
      if (result === null) {
        router.push("/login");
      } else {
        setAdmin(result);
      }
    }
  }, []);

  function handleDrawer() {
    setAddItemDrawer({
      title: "Yangi material qo'shish",
      description:
        "Bu yerga qo'shgan ma'lumotlarinigiz chizlab.uz saytida ko'rinadi",
      width: 80,
      children: <AddMaterialForm />,
    });
  }

  return (
    <>
      <Header />
      <main>
        <div className="flex base-container items-center justify-between p-5 border-b sticky top-0 bg-white z-50">
          <h2 className="text-3xl font-semibold tracking-tight first:mt-0">
            Boshqaruv paneli
          </h2>
          <Button onClick={handleDrawer} variant="outline">
            <PlusCircledIcon />
            Qo'shish
          </Button>
        </div>
        <TableData />
      </main>
      <UniversalDrawer />
    </>
  );
}
