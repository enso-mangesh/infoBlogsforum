export type DiscussionAttachment = {
  name: string;
  size: number;
  type: string;
  url: string;
};

export type Discussion = {
  id: string;
  name: string;
  verified: boolean;
  role?: string;
  title: string;
  description?: string;
  tags: string[];
  replies: number;
  views: number;
  postedAgo: string;
  attachment?: DiscussionAttachment;
};
