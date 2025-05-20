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
import { deleteData, getAllData, getDataById } from "@/requests";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { errorMessages } from "@/constants";
import { Eye, Info, Loader2Icon, Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TableData() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletedData, setDeletedData] = useState(false);
  const { materials, setMaterials, admin, setAdmin } = useAppStore();

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

  useEffect(() => {
    if (deletedData) {
      setDeleteLoading(true);
      deleteData("/materials/", deletedData, admin.access_token)
        .then(({ message }) => {
          toast.success(message);
          const result = materials.filter((el) => el.id !== deletedData);
          setMaterials(result);
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
  }, [deletedData]);

  function handleDelete(id) {
    setDeletedData(id);
  }

  return (
    <div className="base-container py-10 h-full">
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : (
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
                  {/* Delete  */}
                  <TooltipProvider delayDuration="0">
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          if (confirm("O'chirmoqchisizi?")) handleDelete(id);
                        }}
                        className={buttonVariants({
                          variant: "destructive",
                          size: "icon",
                        })}
                        disabled={deletedData === id}
                      >
                        {deletedData === id && deleteLoading ? (
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
      )}
    </div>
  );
}
