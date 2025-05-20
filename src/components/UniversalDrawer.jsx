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
  const { addItemDrawer, setAddItemDrawer } = useAppStore();

  return (
    <Sheet open={addItemDrawer.modal} onOpenChange={setAddItemDrawer}>
      <SheetContent
        style={{
          maxWidth: `${addItemDrawer.width}%`,
          width: "100%",
        }}
      >
        <SheetHeader className="py-1">
          <SheetTitle>{addItemDrawer.title}</SheetTitle>
          <SheetDescription>{addItemDrawer.description}</SheetDescription>
        </SheetHeader>
        <div
          style={{
            maxHeight: "calc(100% - 70px)",
          }}
          className="h-full overflow-y-auto py-5 scroll-smooth"
        >
          {addItemDrawer.children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
