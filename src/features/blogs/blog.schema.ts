import { z } from 'zod';
import { stripHtml } from './utils/blog.utils';

export const blogFormSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters'),
  // category: z.string().min(1, 'Select a category'),
  // readTime: z.string().trim().min(1, 'Enter an estimated read time'),
  keywords: z.string(),
  thumbnail: z.string().nullable(),
  content: z
    .string()
    .refine(
      (html) => stripHtml(html).length >= 50,
      'Share at least a few sentences (50+ characters) before submitting',
    ),
  confirmOriginal: z.boolean().refine((val) => val === true, {
    message: 'You must confirm this content is original before submitting',
  }),
});

export type BlogFormSchema = z.infer<typeof blogFormSchema>;
