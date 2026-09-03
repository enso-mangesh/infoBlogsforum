import { create } from 'zustand';
import { CURRENT_PROFESSIONAL } from '../data/blog.data';
import { Blog, BlogFormValues, BlogStatus } from '../blog.type';
import { calculateReadTime } from '../lib/read-time';
import { getBlogs, getMyBlogs } from '../services/blog-action';

function parseKeywords(raw: string): string[] {
  return raw
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

interface BlogStoreState {
  blogs: Blog[];

  fetchBlogs: (isOwner: boolean) => Promise<void>;

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
      values.thumbnail,
  );
}

export const useBlogStore = create<BlogStoreState>((set, get) => ({
  blogs: [],

  
  // FETCH BLOGS
  fetchBlogs: async (isOwner) => {
    try {
      const response = isOwner
        ? await getMyBlogs()
        : await getBlogs();

      const rawData = response?.data;
      const apiBlogs: Blog[] = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.items)
        ? rawData.items
        : Array.isArray(rawData?.blogs)
        ? rawData.blogs
        : [];

      set({
        blogs: apiBlogs,
      });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);

      set({
        blogs: [],
      });
    }
  },


  // GET BLOG BY ID
  getBlogById: (id) =>
    get().blogs.find(
      (blog) => String(blog.id) === String(id),
    ),

 
  // GET BLOG BY SLUG
  getBlogBySlug: (slug) =>
    get().blogs.find(
      (blog) => blog.slug === slug,
    ),


  // SAVE DRAFT
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
          slug,

          keywords: parseKeywords(values.keywords),

          content: values.content,

          thumbnailUrl:
            values.thumbnail || null,

          readingTime:
            calculateReadTime(values.content),

          status: BlogStatus.DRAFT,

          rejectionReason:
            existing.rejectionReason ?? null,

          updatedAt: now,
        }
      : {
          id: `blog-${Date.now()}`,

          userId: '',

          title: values.title,

          slug,

          content: values.content,

          thumbnailMediaId: null,

          thumbnailUrl:
            values.thumbnail || null,

          keywords:
            parseKeywords(values.keywords),

          tags: null,

          links: null,

          status: BlogStatus.DRAFT,

          readingTime:
            calculateReadTime(values.content),

          likeCount: 0,

          commentCount: 0,

          analyticsCount: 0,

          isActive: true,

          createdAt: now,

          updatedAt: now,

          authorName:
            CURRENT_PROFESSIONAL.name,

          authorProfession: null,

          rejectionReason: null,
        };

    set((state) => ({
      blogs: existing
        ? state.blogs.map((blog) =>
            String(blog.id) ===
            String(existing.id)
              ? blog
              : blog,
          )
        : [blog, ...state.blogs],
    }));

    return blog;
  },

  
  // SUBMIT FOR APPROVAL
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

          slug,

          keywords:
            parseKeywords(values.keywords),

          content: values.content,

          thumbnailUrl:
            values.thumbnail || null,

          readingTime:
            calculateReadTime(values.content),

          status:
            BlogStatus.PENDING_REVIEW,

          rejectionReason: null,

          updatedAt: now,
        }
      : {
          id: `blog-${Date.now()}`,

          userId: '',

          title: values.title,

          slug,

          content: values.content,

          thumbnailMediaId: null,

          thumbnailUrl:
            values.thumbnail || null,

          keywords:
            parseKeywords(values.keywords),

          tags: null,

          links: null,

          status:
            BlogStatus.PENDING_REVIEW,

          readingTime:
            calculateReadTime(values.content),

          likeCount: 0,

          commentCount: 0,

          analyticsCount: 0,

          isActive: true,

          createdAt: now,

          updatedAt: now,

          authorName:
            CURRENT_PROFESSIONAL.name,

          authorProfession: null,

          rejectionReason: null,
        };

    set((state) => ({
      blogs: existing
        ? state.blogs.map((item) =>
            String(item.id) ===
            String(blog.id)
              ? blog
              : item,
          )
        : [blog, ...state.blogs],
    }));

    return blog;
  },
}));
