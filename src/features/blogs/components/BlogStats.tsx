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

  const draftCount = blogs.filter(
    (blog) =>
      blog.status === 'Draft' ||
      (blog.status as string)?.toLowerCase() === 'draft',
  ).length;

  const pendingCount = blogs.filter(
    (blog) =>
      blog.status === 'Pending' ||
      (blog.status as string)?.toLowerCase() === 'pending',
  ).length;

  const publishedCount = blogs.filter(
    (blog) =>
      blog.status === 'Published' ||
      (blog.status as string)?.toLowerCase() === 'published',
  ).length;

  const blogStats = [
    {
      title: 'All',
      statusValue: null,
      count: blogs.length,
    },
    {
      title: 'Drafts',
      statusValue: 'Draft',
      count: draftCount,
    },
    {
      title: 'Pending',
      statusValue: 'Pending',
      count: pendingCount,
    },
    {
      title: 'Published',
      statusValue: 'Published',
      count: publishedCount,
    },
  ];

  return (
    <Card className="w-fit rounded-2xl border-0 bg-gray-100 p-1 shadow-none">
      <div className="flex items-center gap-1">
        {blogStats.map((stat) => {
          const isSelected =
            selectedStatus === stat.statusValue;

          return (
            <button
              key={stat.title}
              type="button"
              onClick={() => {
                if (!onSelectStatus) return;

                if (selectedStatus === stat.statusValue) {
                  onSelectStatus(null);
                } else {
                  onSelectStatus(stat.statusValue);
                }
              }}
              className={`rounded-xl px-4 py-2 text-base font-medium transition-colors md:px-5 md:py-2.5
                ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-gray-600 hover:bg-white'
                }
              `}
            >
              {stat.title} ({stat.count})
            </button>
          );
        })}
      </div>
    </Card>
  );
}