import { ThemeToggle } from "@/components/theme-toggle";
import BlogsContent from "@/features/blogs/components/BlogContent";

export default function BlogsPage() {
  return (
    <div className="mx-auto w-full px-4 py-4 md:px-6">
      {/* <ThemeToggle/> */}
      <BlogsContent isOwner={true} />
    </div>
  );
}