"use client";

import { useState } from "react";
import {
  MessageCircle,
  Heart,
  BarChart3,
  Bookmark,
  Share2,
  Flag,
} from "lucide-react";
import BlogActions from "./BlogAction";
import BlogAnalyticsModal from "./BlogAnalyticsModal";
import { toast } from 'sonner';

interface BlogDetailsBarProps {
  slug: string;
  isOwner?: boolean;
  comments?: number;
  likes?: number;
  views?: number;
  initiallyLiked?: boolean;
  initiallyBookmarked?: boolean;
  onCommentsClick?: () => void;
  onDelete?: () => void;
}

export default function BlogDetailsBar({
  slug,
  isOwner,
  comments = 20,
  likes = 1100,
  views = 2000,
  initiallyLiked = false,
  initiallyBookmarked = false,
  onCommentsClick,
  onDelete,
}: BlogDetailsBarProps) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const [likeCount, setLikeCount] = useState(likes);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  // const [reportOpen, setReportOpen] = useState(false);
  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((count) => (prev ? count - 1 : count + 1));
      return !prev;
    });
  };

const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);

    toast.success('Link copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy blog link:', error);

    toast.error('Failed to copy blog link');
  }
};

  return (
    <>
      <div className="flex items-center justify-between border-y border-y-gray-300 py-2 my-4">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onCommentsClick}
            className="flex items-center gap-1 text-sm"
          >
            <MessageCircle size={23} strokeWidth={1.8} />
            <span>{comments}</span>
          </button>

          {/* Likes */}
          <button
            type="button"
            onClick={handleLike}
            className="flex items-center gap-1 text-sm"
          >
            <Heart
              size={23}
              strokeWidth={1.8}
              className={liked ? "fill-red-500 text-red-500" : ""}
            />

            <span>
              {likeCount >= 1000
                ? `${(likeCount / 1000).toFixed(1)}k`
                : likeCount}
            </span>
          </button>

          {/* Analytics */}
          {isOwner && (
            <button
              type="button"
              onClick={() => setAnalyticsOpen(true)}
              className="flex items-center gap-1 text-sm"
            >
              <BarChart3 size={23} strokeWidth={1.8} />

              <span>
                {views >= 1000 ? `${(views / 1000).toFixed(0)}k` : views}
              </span>
            </button>
          )}
        </div>

        {/* Right side */}
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
          <button type="button" onClick={handleShare} aria-label="Share">
            <Share2 size={23} strokeWidth={1.8} />
          </button>
          {/* <button
            type="button"
            onClick={() => setReportOpen(true)}
            aria-label="Report"
          >
            <Flag size={23} strokeWidth={1.8} />
          </button> */}
          {/* 3 dots - reuse BlogActions */}
          <BlogActions slug={slug} onDelete={onDelete} isOwner={isOwner} />
        </div>
      </div>
      <BlogAnalyticsModal
        open={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
      {/* <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        onReport={(reason, details) => {
          console.log('Report submitted:', {
            slug,
            reason,
            details,
          });
        }}
      /> */}
    </>
  );
}
