
"use client";

import BlogDetailsBarLeft from "./BlogDetailsBarLeft";
import BlogDetailsBarRight from "./BlogDetailsBarRight";

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
  return (
    <div className="flex items-center justify-between border-y border-y-gray-300 py-2 my-4">
      {/* Left side */}
      <BlogDetailsBarLeft
        comments={comments}
        likes={likes}
        views={views}
        initiallyLiked={initiallyLiked}
        isOwner={isOwner}
        onCommentsClick={onCommentsClick}
      />

      {/* Right side */}
      <BlogDetailsBarRight
        slug={slug}
        initiallyBookmarked={initiallyBookmarked}
        isOwner={isOwner}
        onDelete={onDelete}
      />
    </div>
  );
}

