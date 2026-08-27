'use client';

import { useState } from 'react';
import { Heart, MessageSquareReply, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { CommentComposer } from './CommentComposer';
import { formatTimeAgo } from './comment.utils';
import type { CommentItemData } from './comment.types';

const REPLIES_PREVIEW_COUNT = 1;

interface CommentItemProps {
  comment: CommentItemData;
  /** Id of the top-level comment replies are threaded under (flat, one-level threading). */
  rootId: string;
  onReply: (parentId: string, text: string) => void | Promise<void>;
  onToggleLike?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  rootId,
  onReply,
  onToggleLike,
  onDelete,
  isReply = false,
}: CommentItemProps) {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const replies = comment.replies ?? [];
  const visibleReplies = showAllReplies
    ? replies
    : replies.slice(0, REPLIES_PREVIEW_COUNT);
  const hiddenReplyCount = replies.length - visibleReplies.length;

  const handleReplySubmit = async (text: string) => {
    await onReply(rootId, text);
    setIsReplying(false);
  };

  return (
    <>
      <div className="mb-4">
        <div className={cn('flex gap-3', isReply && 'mt-4')}>
          <Avatar size="lg" className="bg-[#EDF7E4]">
            {comment.author.avatarUrl && (
              <AvatarImage
                src={comment.author.avatarUrl}
                alt={comment.author.name}
              />
            )}
            <AvatarFallback className="bg-[#EDF7E4] text-[#85c556] font-bold">
              {comment.author.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>
                {comment.author.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {comment.author.subtitle}
                  </p>
                )}
              </div>

              {comment.isOwn && onDelete && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Comment options"
                      className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem  onClick={() => onDelete(comment.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {comment.content}
        </p>
        <div className="flex items-center gap-4 pt-0.5">
          <button
            type="button"
            onClick={() => onToggleLike?.(comment.id)}
            className={cn(
              'flex items-center gap-1.5 text-xs! text-muted-foreground transition-colors hover:text-foreground',
              comment.likedByViewer && 'text-primary hover:text-primary',
            )}
          >
            <Heart
              size={16}
              className={cn(
                comment.likedByViewer && 'text-red-500 fill-red-500',
              )}
            />
            Like {comment.likeCount > 0 && `(${comment.likeCount})`}
          </button>
          {!isReply && (
            <button
              type="button"
              onClick={() => setIsReplying((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs! text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageSquareReply size={16} />
              Reply
            </button>
          )}
        </div>
      </div>

      {isReplying && (
        <CommentComposer
          autoFocus
          placeholder={`Reply to ${comment.author.name}`}
          onSubmit={handleReplySubmit}
          className="mt-2"
        />
      )}

      {replies.length > 0 && (
        <div className="border-l border-border pl-4 ml-9 space-y-2">
          {visibleReplies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              rootId={rootId}
              onReply={onReply}
              onToggleLike={onToggleLike}
              onDelete={onDelete}
              isReply
            />
          ))}

          {hiddenReplyCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAllReplies(true)}
              className="mt-2 text-sm font-medium text-foreground underline"
            >
              View all
            </button>
          )}
        </div>
      )}
    </>
  );
}
