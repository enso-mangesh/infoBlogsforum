export interface CommentAuthor {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string | null;
  /** Optional line under the name, e.g. a role or specialty. */
  subtitle?: string;
}

export interface CommentItemData {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string | Date;
  likeCount: number;
  likedByViewer?: boolean;
  /** True when the comment belongs to the current viewer, enabling the "..." delete action. */
  isOwn?: boolean;
  replies?: CommentItemData[];
}
