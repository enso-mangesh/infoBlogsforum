import { LucideIcon } from "lucide-react";

export enum BlogStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DRAFT = 'DRAFT',
}

export interface BlogAuthor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
}

export type BlogContentDetails = {
  summary: string;
  highlights: string[];
  whyItMatters: string;
};

export type BlogContentType = string | BlogContentDetails;

export interface Blog {
  id: string;
  userId: string;
  title: string;
  slug: string;
  content: string;
  thumbnailMediaId: string | null;
  thumbnailUrl: string | null;
  keywords: string[] | null;
  tags: string[] | null;
  links: string[] | null;
  status: BlogStatus;
  readingTime: number;
  likeCount: number;
  commentCount: number;
  analyticsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorProfession: string | null;
  rejectionReason: string | null;
  category?: string;
  description?: string;
  likes?: number;
  views?: number;
  comments?: number;
  image?: string;
  thumbnail?: string;
  author?: any;
  specialization?: string;
}

export interface BlogFormValues {
  title: string;
  keywords: string;
  content: string;
  thumbnail: string | null;
}

export interface StatCardProps {
  icon: LucideIcon;
  iconClassName?: string;
  label: string;
  value: string;
  change: string;
}
export interface CreateBlogPayload {
  title: string;
  slug: string;
  content: string;
  status: BlogStatus;
  thumbnail?: string;
}
export interface UpdateBlogPayload {
  title?: string;
  slug?: string;
  content?: string;
  status?: BlogStatus;
  thumbnail?: string;
}

export interface BlogApiResponse {
  id: string;
  userId: string;
  title: string;
  slug: string;
  content: string;
  thumbnailMediaId: string | null;
  thumbnailUrl: string | null;
  tags: string[] | null;
  links: string[] | null;
  mediaUrls: string[] | null;
  status: BlogStatus;
  readingTime: number;
  likeCount: number;
  commentCount: number;
  analyticsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorProfession: string | null;
}

// export interface UpdateBlogPayload {
//   title?: string;
//   category?: string;
//   specialization?: string;
//   description?: string;
//   content?: string;
//   thumbnail?: string;
// }