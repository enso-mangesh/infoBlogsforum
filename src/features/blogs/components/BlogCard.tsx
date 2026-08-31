import Link from "next/link";
import Image from "next/image";
import { Blog } from "../blog.type";
import AuthorInfo from "./AuthorInfo";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../lib/date";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/core/config/routes";
import BlogDetailsBarLeft from "./BlogDetailsBarLeft";

type BlogCardProps = {
  blog: Blog;
  isOwner?: boolean;
};

export default function BlogCard({ blog, isOwner = false }: BlogCardProps) {
  const description =
    blog.description ||
    (typeof blog.content === "string"
      ? blog.content.replace(/<[^>]*>/g, "").slice(0, 140)
      : blog.content.summary);

  const imageSrc = blog.image || blog.thumbnail || "/next.svg";

  const isDraft = (blog.status as string)?.toLowerCase() === "draft";

  // Owner → My Blogs routes
  // User → Public Blogs routes
  const href = isOwner
    ? isDraft
      ? ROUTES.EDIT_BLOG(blog.slug)
      : ROUTES.MY_BLOG_DETAILS(blog.slug)
    : ROUTES.BLOG_DETAILS(blog.slug);

  return (
    <Link href={href} className="block h-full">
      <Card
        interactive
        className="h-full rounded-xl border-gray-200 bg-white hover:shadow-xl"
      >
        <div className="flex h-full gap-6 p-6">
          {/* Content */}
          <CardContent className="flex min-w-0 flex-1 flex-col p-0">
            {/* Author + Date */}
            <div className="mb-4 flex items-center justify-between">
              <AuthorInfo
                author={blog.author}
                specialization={blog.specialization}
              />

              <span className="text-sm text-gray-500">
                {formatDate(blog.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-3 line-clamp-2 text-xl font-semibold leading-tight md:text-3xl">
              {blog.title}
            </h2>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-gray-600 md:text-base">
              {description}
            </p>

            {/* Push footer to bottom */}

            <div className="mt-auto pt-4 justify-between">
              <BlogDetailsBarLeft
                comments={blog.comments}
                likes={blog.likes}
                views={blog.views}
                isOwner={isOwner}
              />
            </div>
          </CardContent>

          {/* Image */}
          <div className="flex flex-col items-end">
            <div className="relative h-40 w-56 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={imageSrc}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <StatusBadge status={blog.status} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
