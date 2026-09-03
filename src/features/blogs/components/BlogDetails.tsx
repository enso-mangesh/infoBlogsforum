"use client";

import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../lib/date";
import { useBlogCommentsStore } from "../store/blog-comments-store";
import { CommentSection } from "@/features/comments/CommentSection";
import BlogDetailsBar from "./BlogDetailsBar";
import { Blog } from "../blog.type";

type Props = {
  blog: Blog;
  isOwner: boolean;
};

export default function BlogDetails({ blog, isOwner }: Props) {
  const blogId = String(blog.id);

  const comments = useBlogCommentsStore((state) => state.getComments(blogId));
  const addComment = useBlogCommentsStore((state) => state.addComment);
  const toggleLike = useBlogCommentsStore((state) => state.toggleLike);
  const deleteComment = useBlogCommentsStore((state) => state.deleteComment);
  const authorName = blog.authorName || "Unknown";
  const imageSrc = blog.thumbnailUrl || "/next.svg";

  const scrollToComments = () => {
    document.getElementById("comments-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-5">
      {/* Blog Header */}
      <div className="relative">
        <h1 className="w-full text-4xl font-bold leading-tight">
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
                <span>{blog.readingTime} min read</span>
              </div>
            </div>
          </div>
          <div className="items-center ">
            <StatusBadge status={blog.status} />
          </div>
        </div>
      </div>

      {/* Blog Details Bar */}
      <BlogDetailsBar
        blogId={blog.id}
        slug={blog.slug}
        isOwner={isOwner}
        comments={blog.commentCount}
        likes={blog.likeCount}
        views={blog.analyticsCount}
        onCommentsClick={scrollToComments}
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
        {blog.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        ) : (
          <p className="text-gray-500">No content available.</p>
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
      <div id="comments-section" className="mt-6 scroll-mt-24">
        <CommentSection
          comments={comments}
          onAddComment={(text, parentId) => addComment(blogId, text, parentId)}
          onToggleLike={(commentId) => toggleLike(blogId, commentId)}
          onDeleteComment={(commentId) => deleteComment(blogId, commentId)}
        />
      </div>
      {/* <Sheet open={commentsOpen} onOpenChange={setCommentsOpen}>
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
      </Sheet> */}
    </main>
  );
}
