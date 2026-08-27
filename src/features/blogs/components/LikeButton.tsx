"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

type LikeButtonProps = {
  initialLikes?: number;
};

export default function LikeButton({
  initialLikes = 0,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }

    setLiked(!liked);
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2"
    >
      <Heart
        className={`h-7 w-7 transition-all ${
          liked
            ? "fill-red-500 text-red-500"
            : "fill-white text-gray-500"
        }`}
      />
      <span>{likes}</span>
    </button>
  );
}