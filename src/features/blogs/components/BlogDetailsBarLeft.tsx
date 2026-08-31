
"use client";

import { useState } from "react";
import {
  MessageCircle,
  Heart,
  BarChart3,
} from "lucide-react";
import BlogAnalyticsModal from "./BlogAnalyticsModal";

interface BlogDetailsBarLeftProps {
  comments?: number;
  likes?: number;
  views?: number;
  initiallyLiked?: boolean;
  isOwner?: boolean;
  onCommentsClick?: () => void;
}

export default function BlogDetailsBarLeft({
  comments = 20,
  likes = 1100,
  views = 2000,
  initiallyLiked = false,
  isOwner,
  onCommentsClick,
}: BlogDetailsBarLeftProps) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((count) => (prev ? count - 1 : count + 1));
      return !prev;
    });
  };

  return (
    <>
      <div className="flex items-center gap-6">
        {/* Comments */}
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
              {views >= 1000
                ? `${(views / 1000).toFixed(0)}k`
                : views}
            </span>
          </button>
        )}
      </div>

      <BlogAnalyticsModal
        open={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
    </>
  );
}
