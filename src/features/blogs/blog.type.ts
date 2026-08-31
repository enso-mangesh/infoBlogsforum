import { LucideIcon } from "lucide-react";

export enum BlogStatus {
  PENDING = 'pending',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
  DRAFT = 'draft',
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
  id: string | number;
  title: string;
  slug: string;
  status: "Pending" | "Draft" | "Published" | BlogStatus | string;
  category: string;
  specialization?: string;
  description?: string;
  keywords?: string[];
  thumbnail?: string | null;
  author: string | BlogAuthor;
  createdAt: string;
  updatedAt?: string;
  readTime: number;
  likes?: number;
  image?: string;
  content: BlogContentType;
  rejectionReason?: string | null;
  comments?: number;
  views?: number;
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
// export interface CreateBlogPayload {
//   title: string;
//   category: string;
//   specialization?: string;
//   description?: string;
//   content: string;
//   thumbnail?: string;
// }
export interface CreateBlogPayload {
  title: string;
  slug: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  thumbnail?: string;
}
export interface UpdateBlogPayload {
  title?: string;
  slug?: string;
  content?: string;
  status?: "DRAFT" | "PUBLISHED";
  thumbnail?: string;
}

// export interface UpdateBlogPayload {
//   title?: string;
//   category?: string;
//   specialization?: string;
//   description?: string;
//   content?: string;
//   thumbnail?: string;
// }