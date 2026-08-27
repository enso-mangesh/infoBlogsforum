"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export function ConfirmReportDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-75
          max-w-75
          rounded-22xl
          border-0
          bg-white
          p-0
          shadow-xl
        "
      >
        <div className="flex flex-col items-center px-5 pt-8 pb-5">
          {/* Title */}
          <h2 className="text-center text-[20px] font-medium leading-7 text-black">
            Are you sure you want
            <br />
            to report this blog?
          </h2>

          {/* Description */}
          <p className="mt-3 text-center text-[14px] leading-5 text-[#666666]">
            Our team will review it and take
            <br />
            appropriate action if it violates our
            <br />
            community guidelines.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex w-full gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="
                h-9
                flex-1
                rounded-xl
                border-black
                text-black
                hover:bg-gray-50
              "
            >
              Go back
            </Button>

            <Button
              onClick={() => {
                onConfirm?.();
                onOpenChange(false);
              }}
              className="
                h-9
                flex-1
                rounded-xl
                bg-[#E60000]
                text-white
                hover:bg-[#CC0000]
              "
            >
              Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}