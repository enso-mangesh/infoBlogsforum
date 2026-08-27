"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-gray-700 hover:text-black"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="text-lg font-medium">Back</span>
    </button>
  );
}