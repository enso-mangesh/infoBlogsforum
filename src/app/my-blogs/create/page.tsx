'use client';


import { CreateBlogForm } from '@/features/blogs/components/CreateBlogForm';


export default function CreateBlogPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Create New Blog</h1>
      <CreateBlogForm />
    </div>
  );
}
