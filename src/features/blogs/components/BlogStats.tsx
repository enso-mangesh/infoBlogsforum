'use client';

import { useBlogStore } from '../store/blog-store';
import { Card } from '@/components/ui/card';

type BlogStatsProps = {
  selectedStatus?: string | null;
  onSelectStatus?: (status: string | null) => void;
};

export default function BlogStats({
  selectedStatus,
  onSelectStatus,
}: BlogStatsProps) {
  const blogs = useBlogStore((state) => state.blogs);

  const blogStats = [
    {
      title: 'Drafts',
      statusValue: 'Draft',
      count: blogs.filter(
        (blog) =>
          blog.status === 'Draft' ||
          (blog.status as string) === 'draft',
      ).length,
      bg: 'bg-blue-light hover:bg-blue-50',
      text: 'text-blue',
      color: 'var(--blue)',
    },
    {
      title: 'Pending',
      statusValue: 'Pending',
      count: blogs.filter(
        (blog) =>
          blog.status === 'Pending' ||
          (blog.status as string) === 'pending',
      ).length,
      bg: 'bg-yellow-light hover:bg-yellow-50',
      text: 'text-yellow',
      color: 'var(--yellow)',
    },
    {
      title: 'Published',
      statusValue: 'Published',
      count: blogs.filter(
        (blog) =>
          blog.status === 'Published' ||
          (blog.status as string) === 'published',
      ).length,
      bg: 'bg-primary-light hover:bg-primary-50',
      text: 'text-primary-dark',
      color: 'var(--primary)',
    },
    {
      title: 'Total',
      statusValue: null,
      count: blogs.length,
      bg: 'bg-purple-light hover:bg-purple-50',
      text: 'text-purple',
      color: 'var(--purple)',
    },
  ];
return (
  <div className="flex items-start justify-start gap-4">
    {blogStats.map((stat) => {
      const isSelected =
        selectedStatus === stat.statusValue ||
        (selectedStatus === null && stat.statusValue === null);

      return (
        <Card
          key={stat.title}
          interactive
          color={stat.color}
          className={`
            min-h-15
            w-30
            rounded-2xl
            border-0
            md:min-h-20
            md:w-30
            md:rounded-2xl
            ${stat.bg}
          `}
        >
          <button
            type="button"
            onClick={() => {
              if (!onSelectStatus) return;

              if (selectedStatus === stat.statusValue) {
                onSelectStatus(null);
              } else {
                onSelectStatus(stat.statusValue);
              }
            }}
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              p-2
              text-center
              md:p-4
            "
          >
            <h2
              className={`text-xl font-bold md:text-3xl ${stat.text}`}
            >
              {stat.count}
            </h2>

            <p
              className={`mt-1 text-sm font-medium md:text-base ${stat.text}`}
            >
              {stat.title}
            </p>
          </button>
        </Card>
      );
    })}
  </div>
);}