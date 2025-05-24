import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/lib/zustand";
import { getAllData } from "@/requests";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Skeleton } from "./ui/skeleton";
import { DeleteButton, EditButton, ReadButton } from "./ActionButtons";

export default function TableData() {
  const [loading, setLoading] = useState(false);

  const { materials, setMaterials } = useAppStore();

  // Get all data
  useEffect(() => {
    setLoading(true);
    getAllData("/materials")
      .then((res) => {
        setMaterials(res, "more");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="base-container py-10 flex flex-col gap-4">
        {Array.from({ length: 9 }).map((_, index) => {
          return <Skeleton key={index} className="w-full h-12" />;
        })}
      </div>
    );
  }

  return (
    <div className="base-container py-10 h-full">
      <Table>
        <TableCaption>chizlab.uz saytidagi ma'lumotlar</TableCaption>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Sarlavha</TableHead>
            <TableHead className="text-right">Harakatlar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map(({ id, title }) => (
            <TableRow key={id}>
              <TableCell className="font-medium text-left">{id}</TableCell>
              <TableCell className="relative">{title}</TableCell>
              <TableCell className="flex gap-3 justify-end">
                {/* Read  */}
                <ReadButton id={id} />
                {/* Edit  */}
                <EditButton id={id} />
                {/* Delete  */}
                <DeleteButton id={id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Jami ma'lumotlar</TableCell>
            <TableCell className="text-right">{materials.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
