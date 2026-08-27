"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { ConfirmReportDialog } from "./ConfirmReport";

const REPORT_REASONS = [
  {
    value: "spam",
    label: "Spam or promotional content",
  },
  {
    value: "misleading",
    label: "False or misleading medical information",
  },
  {
    value: "abusive",
    label: "Offensive or abusive language",
  },
  {
    value: "explicit",
    label: "Inappropriate or explicit content",
  },
  {
    value: "copyright",
    label: "Copyright infringement",
  },
  {
    value: "other",
    label: "Others",
  },
];

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReport?: (reason: string, details?: string) => void;
}


export function ReportDialog({
  open,
  onOpenChange,
  onReport,
}: ReportDialogProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
const [confirmOpen, setConfirmOpen] = useState(false);

  const isOther = reason === "other";

  const canSubmit = reason !== "" && (!isOther || details.trim().length > 0);

const handleReport = () => {
  if (!canSubmit) return;

  setConfirmOpen(true);
};
const handleConfirmReport = () => {
  onReport?.(
    reason,
    isOther ? details.trim() : undefined
  );

  setReason("");
  setDetails("");
  setConfirmOpen(false);
  onOpenChange(false);
};

  const handleCancel = () => {
    setReason("");
    setDetails("");
    onOpenChange(false);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-32px)]
          max-w-[500px]
          gap-0
          overflow-hidden
          rounded-[24px]
          border-0
          bg-white
          p-0
          shadow-2xl
          sm:max-w-[500px]
        "
      >
        {/* Header */}
       {/* Header */}
<DialogHeader
  className="
    flex
    h-[60px]
    flex-row
    items-center
    justify-start
    border-b
    border-gray-200
    px-5
    py-0
    text-left
"
>
  <DialogTitle
    className="
      m-0
      text-left
      text-[14px]
      font-semibold
      leading-[20px]
      text-black
"
  >
    Report blog
  </DialogTitle>
</DialogHeader>

        {/* Content */}
        <div className="px-[18px] py-[14px]">
          <div className="space-y-[10px]">
            {REPORT_REASONS.map((item) => {
              const selected = reason === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setReason(item.value)}
                  className={`
                    flex
                    min-h-[56px]
                    w-full
                    items-center
                    rounded-[16px]
                    border-2
                    px-[16px]
                    py-[14px]
                    text-left
                    text-[14px]
                    font-normal
                    leading-5
                    transition-colors
                    duration-150
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-lime-500
                    ${
                      selected
                        ? "border-[#80C84B] bg-[#EFF8E8]"
                        : "border-transparent bg-[#F5F5F5] hover:bg-[#F1F1F1]"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Other details */}
          {isOther && (
            <div className="mt-[10px]">
              <Textarea
                placeholder="Tell us why you are reporting this blog..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="
                  resize-none
                  rounded-[14px]
                  border-gray-300
                  text-[14px]
                "
              />
            </div>
          )}

          {/* Warning */}
          <div
            className="
              mt-3
              flex
              min-h-[53px]
              items-center
              gap-2.5
              rounded-[12px]
              bg-[#FFF8E6]
              px-[14px]
              py-[10px]
              text-[12px]
              leading-[17px]
              text-[#B45309]
            "
          >
            <AlertTriangle size={16} strokeWidth={2} className="shrink-0" />

            <p>
              False or repeated misuse of the reporting feature may result in
              account suspension.
            </p>
          </div>
        </div>

        {/* Footer */}
      <DialogFooter
  className="
    flex
    w-full
    flex-row
    items-center
    gap-2.5
    border-t
    border-gray-200
    px-6
    py-3.25
  "
>
  <Button
    type="button"
    variant="outline"
    size="xl"
    onClick={handleCancel}
    className="
      flex-1
      w-full
    "
  >
    Cancel
  </Button>

  <Button
    type="button"
    variant="primary"
    size="xl"
    disabled={!canSubmit}
    onClick={handleReport}
    className="
      flex-1
      w-full
    "
  >
    Report
  </Button>
</DialogFooter>
      </DialogContent>
    </Dialog>
    <ConfirmReportDialog
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  onConfirm={handleConfirmReport}
/>
</>
  );
}
