import { INITIAL_BLOGS } from "../data/blog.data";
import { Blog } from "../blog.type";

export function getBlogs(): Blog[] {
  return INITIAL_BLOGS as Blog[];
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return INITIAL_BLOGS.find((blog: Blog) => blog.slug === slug);
}