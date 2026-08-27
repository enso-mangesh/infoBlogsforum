'use client';

import { useParams } from 'next/navigation';
import BlogDetails from '@/features/blogs/components/BlogDetails';

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <BlogDetails slug={slug} />;
}
