'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CommentComposer } from './CommentComposer';
import { CommentItem } from './CommentItem';
import { countAllComments } from './comment.utils';
import type { CommentItemData } from './comment.types';

export interface CommentSectionProps {
  comments: CommentItemData[];
  /** Called with the new comment's text, and the id of the comment it replies to (if any). */
  onAddComment: (text: string, parentId?: string) => void | Promise<void>;
  onToggleLike?: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
  isSubmitting?: boolean;
  title?: string;
  className?: string;
}

export function CommentSection({
  comments,
  onAddComment,
  onToggleLike,
  onDeleteComment,
  isSubmitting = false,
  title = 'Comments',
  className,
}: CommentSectionProps) {
  const totalCount = useMemo(() => countAllComments(comments), [comments]);

  const handleReply = async (parentId: string, text: string) => {
    await onAddComment(text, parentId);
  };

  return (
    <div className={cn('space-y-5', className)}>
      <h2 className="text-base font-normal">
        {title}({totalCount})
      </h2>

      <CommentComposer
        placeholder="Type comment"
        isSubmitting={isSubmitting}
        onSubmit={(text) => onAddComment(text)}
      />

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem
              comment={comment}
              rootId={comment.id}
              onReply={handleReply}
              onToggleLike={onToggleLike}
              onDelete={onDeleteComment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
