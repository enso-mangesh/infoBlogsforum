"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ROUTES } from "@/core/config/routes";
import { ReportDialog } from "@/components/common/ReportDailog";

type BlogActionsProps = {
  slug: string;
  isOwner: boolean;
  onDelete?: () => void;
};

export default function BlogActions({
  slug,
  isOwner,
  onDelete,
}: BlogActionsProps) {
  const router = useRouter();
  const [reportOpen, setReportOpen] = useState(false);

  const handleEdit = () => {
    router.push(ROUTES.EDIT_BLOG(slug));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) return;

    onDelete?.();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-200"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="z-100 w-20 rounded-xl bg-white p-2"
        >
          {isOwner ? (
            <>
              <DropdownMenuItem
                onClick={handleEdit}
                className="cursor-pointer rounded-lg"
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleDelete}
                className="cursor-pointer rounded-lg text-red-600 focus:text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => setReportOpen(true)}
              className="cursor-pointer rounded-lg"
            >
              Report
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Report dialog MUST be outside DropdownMenu */}
      {!isOwner && (
        <ReportDialog
          open={reportOpen}
          onOpenChange={setReportOpen}
          onReport={(reason, details) => {
            console.log("Report submitted:", {
              slug,
              reason,
              details,
            });

            setReportOpen(false);
          }}
        />
      )}
    </>
  );
}