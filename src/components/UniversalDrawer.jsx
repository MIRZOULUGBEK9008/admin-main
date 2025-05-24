"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useAppStore } from "@/lib/zustand";

export default function UniversalDrawer() {
  const { crudDrawer, setCrudDrawer } = useAppStore();

  return (
    <Sheet open={crudDrawer.modal} onOpenChange={setCrudDrawer}>
      <SheetContent
        style={{
          maxWidth: `${crudDrawer.width}%`,
          width: "100%",
        }}
      >
        <SheetHeader className="py-2">
          <SheetTitle>{crudDrawer.title}</SheetTitle>
          <SheetDescription>{crudDrawer.description}</SheetDescription>
        </SheetHeader>
        <div
          style={{
            maxHeight: "calc(100% - 70px)",
          }}
          className="h-full overflow-y-auto py-5 scroll-smooth"
        >
          {crudDrawer.children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
