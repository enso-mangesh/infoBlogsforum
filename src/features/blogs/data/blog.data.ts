import { Blog, BlogAuthor } from "../blog.type";

export const CURRENT_PROFESSIONAL: BlogAuthor = {
  id: "prof-1",
  name: "Dr. Arjun Mehta",
  initials: "AM",
  specialty: "Cardiology",
};

export const BLOG_CATEGORIES = [
  "Cardiology",
  "Endocrinology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
] as const;
