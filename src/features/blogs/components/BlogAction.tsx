"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BlogActionsProps = {
  slug: string;
  onDelete?: () => void;
};

export default function BlogActions({
  slug,
  onDelete,
}: BlogActionsProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/blogs/${slug}/edit`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    if (onDelete) {
      onDelete();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 transition">
          <MoreVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-100 w-20 rounded-xl p-2 bg-white"
      >
        <DropdownMenuItem
          onClick={handleEdit}
          className="cursor-pointer gap-2 rounded-lg"
        >
          {/* <Pencil className="h-4 w-4" /> */}
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          className="cursor-pointer gap-2 rounded-lg text-red-600 focus:text-red-600"
        >
          {/* <Trash2 className="h-4 w-4" /> */}
          Delete
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}