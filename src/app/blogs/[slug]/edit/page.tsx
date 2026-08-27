'use client';

import { useParams } from 'next/navigation';
import BackButton from '@/features/blogs/components/BackButton';
import { CreateBlogForm } from '@/features/blogs/components/CreateBlogForm';
import { useBlogStore } from '@/features/blogs/store/blog-store';

export default function EditBlogPage() {
  const params = useParams();

  const slug = params.slug as string;

  const blog = useBlogStore((state) =>
    state.getBlogBySlug(slug)
  );

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <BackButton />

      <h1 className="mb-6 text-3xl font-bold">
        Edit Draft
      </h1>

      <CreateBlogForm blog={blog} />
    </div>
  );
}