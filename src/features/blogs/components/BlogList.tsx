'use client';

import { useMemo, useState } from 'react';
import BlogCard from './BlogCard';
import SortDropdown from './SortDropdown';
import { SlidersHorizontal } from 'lucide-react';

type Props = {
  blogs: any[];
};

export default function BlogsList({ blogs }: Props) {
  const [sortBy, setSortBy] = useState('new-old');

  const sortedBlogs = useMemo(() => {
    const sorted = [...blogs];

    switch (sortBy) {
      case 'old-new':
        sorted.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
        break;

      case 'latest':
      case 'new-old':
      default:
        sorted.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }

    return sorted;
  }, [blogs, sortBy]);

  return (
    <>
      <div className="mb-6 flex justify-end gap-3">
        <SortDropdown
          value={sortBy}
          onChange={setSortBy}
        />

        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <SlidersHorizontal className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {sortedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}