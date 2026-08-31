
"use client";

import { useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import BlogActions from "./BlogAction";

interface BlogDetailsBarRightProps {
  slug: string;
  initiallyBookmarked?: boolean;
  isOwner?: boolean;
  onDelete?: () => void;
}

export default function BlogDetailsBarRight({
  slug,
  initiallyBookmarked = false,
  isOwner,
  onDelete,
}: BlogDetailsBarRightProps) {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy blog link:", error);

      toast.error("Failed to copy blog link");
    }
  };

  return (
    <div className="flex items-center gap-5">
      {/* Bookmark */}
      <button
        type="button"
        onClick={() => setBookmarked((prev) => !prev)}
        aria-label="Bookmark"
      >
        <Bookmark
          size={23}
          strokeWidth={1.8}
          className={bookmarked ? "fill-current" : ""}
        />
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share"
      >
        <Share2 size={23} strokeWidth={1.8} />
      </button>

      {/* 3 dots */}
      <BlogActions
        slug={slug}
        onDelete={onDelete}
        isOwner={isOwner ?? false}
      />
    </div>
  );
}
