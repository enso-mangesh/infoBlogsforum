// import { create } from 'zustand';
// import { CURRENT_PROFESSIONAL } from '../data/blog.data';
// import { Blog, BlogFormValues, BlogStatus } from '../blog.type';

// function parseKeywords(raw: string): string[] {
//   return raw
//     .split(',')
//     .map((k) => k.trim())
//     .filter(Boolean);
// }

// interface BlogStoreState {
//   blogs: Blog[];
//   getBlogById: (id: string | number) => Blog | undefined;
//   getBlogBySlug: (slug: string) => Blog | undefined; 
//   saveDraft: (values: BlogFormValues,blogId?: string | number) => Blog;
//   submitForApproval: (values: BlogFormValues, blogId?: string | number) => Blog;
// }

// export const useBlogStore = create<BlogStoreState>((set, get) => ({
//   blogs: [],
//   getBlogById: (id) => get().blogs.find((b) => String(b.id) === String(id)),
//   getBlogBySlug: (slug) => get().blogs.find((b) => b.slug === slug),
//    saveDraft: (values, blogId) => {
//   const now = new Date().toISOString();
//   const existing = blogId ? get().getBlogById(blogId) : undefined;

//   const slug = values.title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)+/g, '');

//   const blog: Blog = existing
//     ? {
//         ...existing,
//         title: values.title,
//         category: values.category,
//         readTime: values.readTime,
//         keywords: parseKeywords(values.keywords),
//         content: values.content,
//         thumbnail: values.thumbnail,
//         status: 'Draft',
//         rejectionReason: existing.rejectionReason ?? null,
//         updatedAt: now,
//       }
//     : {
//         id: `blog-${Date.now()}`,
//         title: values.title,
//         slug,
//         category: values.category,
//         readTime: values.readTime,
//         keywords: parseKeywords(values.keywords),
//         content: values.content,
//         thumbnail: values.thumbnail,
//         image:
//           values.thumbnail ||
//           '/routine-thyroid-screening-women-over-35.png',
//         status: 'Draft',
//         author: CURRENT_PROFESSIONAL,
//         createdAt: now,
//         updatedAt: now,
//         rejectionReason: null,
//       };

//   set((state) => ({
//     blogs: existing
//       ? state.blogs.map((b) =>
//           String(b.id) === String(blog.id) ? blog : b
//         )
//       : [blog, ...state.blogs],
//   }));

//   return blog;
// },

//   submitForApproval: (values, blogId) => {
//     const now = new Date().toISOString();
//     const existing = blogId ? get().getBlogById(blogId) : undefined;
//     const slug = values.title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)+/g, '');

//     const blog: Blog = existing
//       ? {
//           ...existing,
//           title: values.title,
//           category: values.category,
//           readTime: values.readTime,
//           keywords: parseKeywords(values.keywords),
//           content: values.content,
//           thumbnail: values.thumbnail,
//           status: 'Pending',
//           rejectionReason: null,
//           updatedAt: now,
//         }
//       : {
//           id: `blog-${Date.now()}`,
//           title: values.title,
//           slug,
//           category: values.category,
//           readTime: values.readTime,
//           keywords: parseKeywords(values.keywords),
//           content: values.content,
//           thumbnail: values.thumbnail,
//           image: values.thumbnail || '/routine-thyroid-screening-women-over-35.png',
//           status: 'Pending',
//           author: CURRENT_PROFESSIONAL,
//           createdAt: now,
//           updatedAt: now,
//           rejectionReason: null,
//         };

//     set((state) => ({
//       blogs: existing
//         ? state.blogs.map((b) => (String(b.id) === String(blog.id) ? blog : b))
//         : [blog, ...state.blogs],
//     }));

//     return blog;
    
//   },
// }));

import { create } from 'zustand';
import { CURRENT_PROFESSIONAL } from '../data/blog.data';
import { Blog, BlogFormValues } from '../blog.type';
import { calculateReadTime } from '../lib/read-time';

function parseKeywords(raw: string): string[] {
  return raw
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

interface BlogStoreState {
  blogs: Blog[];
  getBlogById: (id: string | number) => Blog | undefined;
  getBlogBySlug: (slug: string) => Blog | undefined;
  saveDraft: (
    values: BlogFormValues,
    blogId?: string | number,
  ) => Blog | undefined;
  submitForApproval: (
    values: BlogFormValues,
    blogId?: string | number,
  ) => Blog;
}
function hasContent(content?: string): boolean {
  if (!content) return false;

  const text = content
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();

  return text.length > 0;
}

function hasFormData(values: BlogFormValues): boolean {
  return Boolean(
    values.title?.trim() ||
    values.keywords?.trim() ||
    hasContent(values.content) ||
    values.thumbnail
  );
}

export const useBlogStore = create<BlogStoreState>((set, get) => ({
  blogs: [],

  getBlogById: (id) =>
    get().blogs.find((b) => String(b.id) === String(id)),

  getBlogBySlug: (slug) =>
    get().blogs.find((b) => b.slug === slug),

  saveDraft: (values, blogId) => {
      if (!hasFormData(values)) {
    return blogId
      ? get().getBlogById(blogId)
      : undefined;
  }
    const now = new Date().toISOString();
    
    const existing = blogId
      ? get().getBlogById(blogId)
      : undefined;

    const slug = values.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const blog: Blog = existing
      ? {
          ...existing,
          title: values.title,
          keywords: parseKeywords(values.keywords),
          content: values.content,
          thumbnail: values.thumbnail,
          readTime: calculateReadTime(values.content),
          status: 'Draft',
          rejectionReason: existing.rejectionReason ?? null,
          updatedAt: now,
        }
      : {
          id: `blog-${Date.now()}`,
          title: values.title,
          slug,
          category: '',
          readTime: calculateReadTime(values.content),

          keywords: parseKeywords(values.keywords),
          content: values.content,
          thumbnail: values.thumbnail,
          image:
            values.thumbnail || undefined,
          status: 'Draft',
          author: CURRENT_PROFESSIONAL,
          createdAt: now,
          updatedAt: now,
          rejectionReason: null,
        };

    set((state) => ({
      blogs: existing
        ? state.blogs.map((b) =>
            String(b.id) === String(blog.id) ? blog : b,
          )
        : [blog, ...state.blogs],
    }));

    return blog;
  },

  submitForApproval: (values, blogId) => {
    const now = new Date().toISOString();

    const existing = blogId
      ? get().getBlogById(blogId)
      : undefined;

    const slug = values.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const blog: Blog = existing
      ? {
          ...existing,
          title: values.title,
          keywords: parseKeywords(values.keywords),
          content: values.content,
          thumbnail: values.thumbnail,
          readTime: calculateReadTime(values.content),
          status: 'Pending',
          rejectionReason: null,
          updatedAt: now,
        }
      : {
          id: `blog-${Date.now()}`,
          title: values.title,
          slug,
          category: '',
          readTime: calculateReadTime(values.content),

          keywords: parseKeywords(values.keywords),
          content: values.content,
          thumbnail: values.thumbnail,
          image:
            values.thumbnail || undefined,
          status: 'Pending',
          author: CURRENT_PROFESSIONAL,
          createdAt: now,
          updatedAt: now,
          rejectionReason: null,
        };

    set((state) => ({
      blogs: existing
        ? state.blogs.map((b) =>
            String(b.id) === String(blog.id) ? blog : b,
          )
        : [blog, ...state.blogs],
    }));

    return blog;
  },
}));