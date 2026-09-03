import BlogDetails from "@/features/blogs/components/BlogDetails";
import {
  getBlogs,
  getBlogById,
} from "@/features/blogs/services/blog-action";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PublicBlogDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1. Try fetching directly by slug or ID
  let result = await getBlogById(slug);

  // 2. Fallback: fetch blogs list and match slug/id
  if (!result.success || !result.data) {
    try {
      const response = await getBlogs();
      const rawData = response?.data;
      const blogs: any[] = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.items)
          ? rawData.items
          : Array.isArray(rawData?.blogs)
            ? rawData.blogs
            : [];

      const blogFromList = blogs.find(
        (blog: any) =>
          blog.slug === slug ||
          String(blog.id) === slug ||
          encodeURIComponent(blog.slug || "") === slug,
      );

      if (blogFromList?.id) {
        result = await getBlogById(String(blogFromList.id));
        if (!result.success || !result.data) {
          result = { success: true, data: blogFromList };
        }
      } else if (blogFromList) {
        result = { success: true, data: blogFromList };
      }
    } catch (err) {
      console.error("Error fetching blog list for detail fallback:", err);
    }
  }

  if (!result.success || !result.data) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold">
          Blog not found
        </h1>
      </main>
    );
  }

  return (
    <BlogDetails
      blog={result.data}
      isOwner={false}
    />
  );
}