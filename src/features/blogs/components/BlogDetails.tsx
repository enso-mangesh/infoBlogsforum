"use client";

import { useState } from "react";
import { useBlogStore } from "../store/blog-store";
import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../lib/date";
import { useBlogCommentsStore } from "../store/blog-comments-store";
import { CommentSection } from "@/features/comments/CommentSection";
import BlogDetailsBar from "./BlogDetailsBar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  slug: string;
  isOwner: boolean;
};

export default function BlogDetails({ slug, isOwner  }: Props) {
  const blog = useBlogStore((state) =>
    state.blogs.find((b) => b.slug === slug),
  );

  const blogId = blog?.id != null ? String(blog.id) : "";

  const comments = useBlogCommentsStore((state) => state.getComments(blogId));

  const addComment = useBlogCommentsStore((state) => state.addComment);

  const toggleLike = useBlogCommentsStore((state) => state.toggleLike);

  const deleteComment = useBlogCommentsStore((state) => state.deleteComment);

  const [commentsOpen, setCommentsOpen] = useState(false);

  if (!blog) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Blog not found</h1>
      </main>
    );
  }

  const authorName =
    typeof blog.author === "string" ? blog.author : blog.author.name;

  const imageSrc =
    blog.image ||
    blog.thumbnail ||
    "/next.svg";

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      {/* Blog Header */}
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={blog.status} />
        </div>

        <h1 className="mt-5 w-full text-4xl font-bold leading-tight">
          {blog.title}
        </h1>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl font-semibold text-blue-600">
              {authorName
                .replace(/^Dr\.\s*/i, "")
                .split(" ")
                .map((word) => word[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-900">
                {authorName}
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <span>{formatDate(blog.createdAt)}</span>
                <span>•</span>
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Details Bar */}
      <BlogDetailsBar
        slug={blog.slug}
        isOwner={isOwner}
        comments={20}
        likes={1100}
        views={2000}
        onCommentsClick={() => setCommentsOpen(true)}
      />

      {/* Thumbnail */}
      <div className="relative mt-8 h-120 w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Content */}
      <section className="prose mt-8 w-full max-w-none">
        {typeof blog.content === "string" ? (
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        ) : (
          <p>{blog.content?.summary}</p>
        )}
      </section>

      {/* Keywords */}
      {(blog.keywords ?? []).length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-2xl font-semibold">Keywords</h2>

          <div className="flex flex-wrap gap-2">
            {(blog.keywords ?? []).map((keyword) => (
              <Badge key={keyword} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Comments Sheet */}
      <Sheet open={commentsOpen} onOpenChange={setCommentsOpen}>
        <SheetContent side="right" className="border-none bg-white p-0">
          <SheetHeader className="shrink-0 border-b border-gray-300 px-5 py-4">
            <SheetTitle>Comments</SheetTitle>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <CommentSection
              comments={comments}
              onAddComment={(text, parentId) =>
                addComment(blogId, text, parentId)
              }
              onToggleLike={(commentId) => toggleLike(blogId, commentId)}
              onDeleteComment={(commentId) => deleteComment(blogId, commentId)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
