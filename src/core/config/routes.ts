import type { Route } from 'next';

export const ROUTES = {
  BLOGS: '/blogs',
  BLOG_DETAILS: (slug: string) => `/blogs/${slug}`,
  
 
  MY_BLOGS:'/my-blogs',
  CREATE_BLOG:'/my-blogs/create',
  EDIT_BLOG: (slug: string) => `/my-blogs/${slug}/edit`,
  MY_BLOG_DETAILS: (slug: string) => `/my-blogs/${slug}`,
  
  FORUM: '/forum',
  CREATE_DISCUSSION: '/forum/create',
  DISCUSSION_DETAIL: (slug: string) => `/forum/${slug}`,

} as const;


