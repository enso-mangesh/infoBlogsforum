import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '../blog.type';
import AuthorInfo from './AuthorInfo';
import StatusBadge from './StatusBadge';
import { formatDate } from '../lib/date';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/core/config/routes';

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  const description =
    blog.description ||
    (typeof blog.content === 'string'
      ? blog.content.replace(/<[^>]*>/g, '').slice(0, 140)
      : blog.content.summary);

  const imageSrc =
    blog.image ||
    blog.thumbnail ||
    '/routine-thyroid-screening-women-over-35.png';

  const isDraft = (blog.status as string)?.toLowerCase() === 'draft';

  const href = isDraft
  ? ROUTES.EDIT_BLOG(blog.slug)
  : ROUTES.MY_BLOG_DETAILS(blog.slug);

  return (
    <Link href={href} className="block h-full">
      <Card
        interactive
        className="h-full rounded-xl border-gray-200 bg-white hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative h-50 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col p-4">
          {/* Status + Date */}
          <div className="mb-4 flex items-center justify-between">
            <StatusBadge status={blog.status} />

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
          <div className="flex-1" />

          {/* Author */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <AuthorInfo
              author={blog.author}
              specialization={blog.specialization}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}