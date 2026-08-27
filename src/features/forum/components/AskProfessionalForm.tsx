"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDiscussionsStore } from "../store/useDiscussionstore";
import { CATEGORY_OPTIONS } from "../data/discussion";
import { SuccessDialog } from "@/components/common/SuccessDailog";

const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_ATTACHMENT_TYPES = ".pdf,.jpg,.jpeg,.png";

const formatFileSize = (bytes: number) =>
  `${(bytes / (1024 * 1024)).toFixed(1)}MB`;

type AskProfessionalFormProps = {
  authorName: string;
};

const AskProfessionalForm = ({ authorName }: AskProfessionalFormProps) => {
  const router = useRouter();
  const addDiscussion = useDiscussionsStore((state) => state.addDiscussion);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (!showSuccessDialog) return;

    const timer = setTimeout(() => {
      router.push("/forum");
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSuccessDialog, router]);

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      toast.error("Attachment must be 5MB or smaller.");
      return;
    }

    setAttachment(file);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Please add a case title.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please write your chief complaint.");
      return;
    }

    addDiscussion({
      id: Date.now().toString(),
      name: authorName,
      verified: false,
      title: title.trim(),
      description: description.trim(),
      tags: categories,
      replies: 0,
      views: 0,
      postedAgo: "Just now",
      attachment: attachment
        ? {
            name: attachment.name,
            size: attachment.size,
            type: attachment.type,
            url: URL.createObjectURL(attachment),
          }
        : undefined,
    });

    setShowSuccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-4 space-y-1 sm:px-6">
        <h1 className="text-lg mb-4 font-semibold text-text-foreground">
          Ask A Professional
        </h1>

        {/* <div className="mt-5 flex items-start gap-2 rounded-xl border border-primary-green bg-light-green py-2 px-2">
          <Lock className="mt-0.5 size-4 shrink-0 text-green-800" />
          <p className="text-sm text-green-800">
            Patient details are anonymised. This case will only be visible to
            verified doctors on the platform.
          </p>
        </div> */}

        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter case title"
          className="h-13 rounded-xl"
        />
        <div className="mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-[#f5f5f5] text-[#757575] px-4 py-3.5 text-left text-sm focus-visible:ring-1 focus-visible:ring-primary-green focus-visible:outline-primary-green focus-visible:outline-1 data-[state=open]:ring-1 data-[state=open]:ring-primary-green data-[state=open]:outline-primary-green data-[state=open]:outline-1"
              >
                {categories.length > 0
                  ? `${categories.length} categor${categories.length > 1 ? "ies" : "y"} selected`
                  : "Category"}
                <ChevronDown className="size-4 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) bg-white">
              {CATEGORY_OPTIONS.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  onSelect={(event) => event.preventDefault()}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className=" border border-primary-green bg-light-green px-3 py-1 text-sm text-text-foreground"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3">
          {attachment ? (
            <div className="flex items-start justify-between rounded-lg bg-light-green p-4 border-[1.85px] border-dashed border-gray-200">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary-green/40 text-white">
                  <Check className="size-4 text-primary-green stroke-2" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-foreground">
                    {attachment.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                aria-label="Remove attachment"
                className="text-text-foreground hover:text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-2xl border-[1.85px] border-dashed border-gray-200 bg-[#f5f5f5] p-4 text-left hover:bg-muted"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <Upload className="size-4 text-[#757575]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text-foreground">
                  Upload attachments
                </p>
                <p className="text-[10px] text-[#696969]">
                  PDF, JPG or PNG · Max 5MB
                </p>
              </div>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_ATTACHMENT_TYPES}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Start writing your chief complaint"
          className={cn(
            "mt-4 min-h-48 w-full flex-1 resize-none rounded-2xl bg-white shadow-sm p-4 text-xs text-[#696969]",
            "placeholder:text-gray-400 focus:outline-none",
          )}
        />

        <div className="sticky bottom-0 mt-2 bg-background pb-2 pt-2">
          <Button
            type="button"
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            width="full"
          >
            Post in forum
          </Button>
        </div>
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        title="Case submitted for review!"
        description="Your case will be reviewed within 24–48 hours. You will be notified once it is approved and published."
        buttonText="OK"
        onDone={() => {
          setShowSuccessDialog(false);
          router.push("/forum");
        }}
      />
    </div>
  );
};

export default AskProfessionalForm;
