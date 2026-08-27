"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { BlogAnalytics } from "./BlogAnalytics";
import { AudienceBreakdown } from "./AudienceBreakdown";

interface BlogAnalyticsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BlogAnalyticsModal({
  open,
  onClose,
}: BlogAnalyticsModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton
        className="flex max-h-[90vh] w-[calc(100%-32px)] max-w-160 flex-col overflow-hidden rounded-3xl p-0"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-200 px-4 py-4 text-left">
          <DialogTitle className="text-base font-semibold">
            Blog analytics
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
            Overview
          </p>

          <BlogAnalytics />

          {/* Audience breakdown */}
          <section className="mt-7">
            <AudienceBreakdown />

            {/* Age groups */}
            <div className="mb-7">
              <p className="mb-4 text-xs font-medium">Audience Age Groups</p>

              <div className="flex h-27 items-end justify-between gap-2 border-b border-gray-100">
                <AgeBar height="20%" label="18-24" />
                <AgeBar height="65%" label="25-34" />
                <AgeBar height="50%" label="35-44" />
                <AgeBar height="25%" label="45-54" />
                <AgeBar height="15%" label="55+" />
              </div>
            </div>

            {/* Audience type */}
            <div className="mb-7">
              <p className="mb-4 text-xs font-medium">Audience Type</p>

              <AudienceProgress label="Doctors" percentage="47%" width="47%" />

              <AudienceProgress
                label="CA"
                percentage="18%"
                width="18%"
                purple
              />

              <AudienceProgress label="CS" percentage="14%" width="14%" />

              <AudienceProgress
                label="Lawyer"
                percentage="13%"
                width="13%"
                orange
              />

              <AudienceProgress
                label="Users"
                percentage="8%"
                width="8%"
                purple
              />
            </div>

            {/* Privacy */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <h4 className="mb-1 text-xs font-semibold">
                Viewer Privacy Protected
              </h4>

              <p className="text-[11px] leading-5 text-gray-500">
                Only aggregated, anonymous insights are shown. Individual viewer
                names, profiles and identities are never exposed.
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AgeBar({ height, label }: { height: string; label: string }) {
  return (
    <div className="flex h-full flex-1 flex-col justify-end">
      <div className="rounded-t bg-blue-500" style={{ height }} />

      <span className="mt-2 text-center text-[8px] text-gray-400">{label}</span>
    </div>
  );
}

function AudienceProgress({
  label,
  percentage,
  width,
  purple = false,
  orange = false,
}: {
  label: string;
  percentage: string;
  width: string;
  purple?: boolean;
  orange?: boolean;
}) {
  const color = orange
    ? "bg-orange-400"
    : purple
      ? "bg-purple-600"
      : "bg-lime-500";

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-[11px]">
        <span>{label}</span>
        <span className="text-gray-500">-{percentage}</span>
      </div>

      <div className="h-2 rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
    </div>
  );
}
