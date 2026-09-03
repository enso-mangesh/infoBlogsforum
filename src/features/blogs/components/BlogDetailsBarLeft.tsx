"use client";

import { useState, useTransition } from "react";
import { Heart, MessageCircle, BarChart3 } from "lucide-react";
import { likeBlog, unlikeBlog } from "../services/blog-action";

interface BlogDetailsBarLeftProps {
  blogId: string;
  comments?: number;
  likes?: number;
  views?: number;
  initiallyLiked?: boolean;
  isOwner?: boolean;
  onCommentsClick?: () => void;
}

export default function BlogDetailsBarLeft({
  blogId,
  comments = 0,
  likes = 0,
  views = 0,
  initiallyLiked = false,
  onCommentsClick,
}: BlogDetailsBarLeftProps) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (isPending) return;

    const nextLiked = !liked;

    // Optimistic UI
    setLiked(nextLiked);
    setLikeCount((count) => (nextLiked ? count + 1 : count - 1));

    startTransition(async () => {
      const result = nextLiked
        ? await likeBlog(blogId)
        : await unlikeBlog(blogId);

      console.log("LIKE ACTION RESULT:", result);

      if (!result.success) {
        // Rollback if API fails
        setLiked(liked);
        setLikeCount(likes);

        console.error("Like API failed:", result.error);
      }
    });
  };

  return (
    <div className="flex items-center gap-6">
      {/* Comments */}
      <button
        type="button"
        onClick={onCommentsClick}
        className="flex items-center gap-2"
      >
        <MessageCircle className="h-6 w-6" />
        <span>{comments}</span>
      </button>

      {/* Like */}
      <button
        type="button"
        onClick={handleLike}
        disabled={isPending}
        className="flex items-center gap-2"
      >
        <Heart
          className={`h-6 w-6 transition ${
            liked
              ? "fill-red-500 text-red-500"
              : "text-black"
          }`}
        />

        <span>{likeCount}</span>
      </button>

      {/* Views */}
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6" />
        <span>{views}</span>
      </div>
    </div>
  );
}