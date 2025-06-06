"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/zustand";
import { useEffect } from "react";
import TableData from "@/components/TableData";
import Header from "@/components/Header";
import UniversalDrawer from "@/components/UniversalDrawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import CRUDMaterialForm from "@/components/form/CRUDMaterialForm";
import { ChartNoAxesCombined } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getStatistics } from "@/lib/utils";

export default function page() {
  const { admin, setCrudDrawer, setAdmin, materials } = useAppStore();
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
    setCrudDrawer({
      title: "Yangi material qo'shish",
      description:
        "Bu yerga qo'shgan ma'lumotlarinigiz chizlab.uz saytida ko'rinadi",
      width: 80,
      children: <CRUDMaterialForm />,
    });
  }

  function handleStatistics() {
    let ui = "";
    const result = getStatistics(materials);
    Object.entries(result).forEach((el) => {
      const res = el.join(": ");
      ui += `\n ${res}`;
    });
    alert(ui);
  }

  return (
    <>
      <Header />
      <main>
        <div className="flex base-container items-center justify-between p-5 border-b sticky top-0 bg-white z-50">
          <h2 className="text-3xl font-semibold tracking-tight first:mt-0">
            Boshqaruv paneli
          </h2>
          <div className="flex gap-5">
            <TooltipProvider delayDuration="0">
              <Tooltip>
                <TooltipTrigger
                  onClick={handleStatistics}
                  disabled={materials.length === 0}
                  className={`${buttonVariants({ size: "icon" })}`}
                >
                  <ChartNoAxesCombined />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Statistikani ko'rish</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={handleDrawer} variant="outline">
              <PlusCircledIcon />
              Qo'shish
            </Button>
          </div>
        </div>
        <TableData />
      </main>
      <UniversalDrawer />
    </>
  );
}
