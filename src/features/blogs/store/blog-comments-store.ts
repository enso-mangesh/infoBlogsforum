import { create } from 'zustand';

import { CURRENT_PROFESSIONAL } from '../data/blog.data';
import { CommentItemData } from '@/features/comments/comment.types';

const SEED_COMMENTS: Record<string, CommentItemData[]> = {
  'blog-1': [
    {
      id: 'comment-1',
      author: { id: 'user-1', name: 'John Doe', initials: 'JD' },
      content:
        'It is a long established fact that a reader will be distracted by ..',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      likeCount: 19,
      replies: [
        {
          id: 'comment-1-reply-1',
          author: {
            id: 'prof-3',
            name: 'Dr. Anita Krishnan',
            initials: 'AK',
            subtitle: 'General Physician',
          },
          content:
            'It is a long established fact that a reader will be distracted by ..',
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          likeCount: 19,
        },
      ],
    },
    {
      id: 'comment-2',
      author: {
        id: 'prof-3',
        name: 'Dr. Anita Krishnan',
        initials: 'AK',
        subtitle: 'General Physician',
      },
      content:
        'It is a long established fact that a reader will be distracted by ..',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      likeCount: 19,
    },
  ],
};

interface BlogCommentsState {
  commentsByBlogId: Record<string, CommentItemData[]>;
  getComments: (blogId: string) => CommentItemData[];
  addComment: (blogId: string, text: string, parentId?: string) => void;
  toggleLike: (blogId: string, commentId: string) => void;
  deleteComment: (blogId: string, commentId: string) => void;
}

function toggleLikeInTree(
  comments: CommentItemData[],
  commentId: string,
): CommentItemData[] {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      const liked = !comment.likedByViewer;
      return {
        ...comment,
        likedByViewer: liked,
        likeCount: comment.likeCount + (liked ? 1 : -1),
      };
    }
    if (comment.replies?.length) {
      return {
        ...comment,
        replies: toggleLikeInTree(comment.replies, commentId),
      };
    }
    return comment;
  });
}

function deleteFromTree(
  comments: CommentItemData[],
  commentId: string,
): CommentItemData[] {
  return comments
    .filter((comment) => comment.id !== commentId)
    .map((comment) =>
      comment.replies?.length
        ? { ...comment, replies: deleteFromTree(comment.replies, commentId) }
        : comment,
    );
}

const EMPTY_COMMENTS: CommentItemData[] = [];

export const useBlogCommentsStore = create<BlogCommentsState>((set, get) => ({
  commentsByBlogId: SEED_COMMENTS,

  getComments: (blogId) => get().commentsByBlogId[blogId] ?? EMPTY_COMMENTS,

  addComment: (blogId, text, parentId) => {
    const newComment: CommentItemData = {
      id: `comment-${Date.now()}`,
      author: {
        id: CURRENT_PROFESSIONAL.id,
        name: CURRENT_PROFESSIONAL.name,
        initials: CURRENT_PROFESSIONAL.initials,
        subtitle: CURRENT_PROFESSIONAL.specialty,
      },
      content: text,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      isOwn: true,
    };

    set((state) => {
      const existing = state.commentsByBlogId[blogId] ?? [];
      const updated = parentId
        ? existing.map((comment) =>
            comment.id === parentId
              ? {
                  ...comment,
                  replies: [...(comment.replies ?? []), newComment],
                }
              : comment,
          )
        : [newComment, ...existing];

      return {
        commentsByBlogId: { ...state.commentsByBlogId, [blogId]: updated },
      };
    });
  },

  toggleLike: (blogId, commentId) => {
    set((state) => ({
      commentsByBlogId: {
        ...state.commentsByBlogId,
        [blogId]: toggleLikeInTree(
          state.commentsByBlogId[blogId] ?? [],
          commentId,
        ),
      },
    }));
  },

  deleteComment: (blogId, commentId) => {
    set((state) => ({
      commentsByBlogId: {
        ...state.commentsByBlogId,
        [blogId]: deleteFromTree(
          state.commentsByBlogId[blogId] ?? [],
          commentId,
        ),
      },
    }));
  },
}));
