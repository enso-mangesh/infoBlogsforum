'use client';

import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommentComposerProps {
  onSubmit: (text: string) => void | Promise<void>;
  placeholder?: string;
  autoFocus?: boolean;
  isSubmitting?: boolean;
  className?: string;
}

export function CommentComposer({
  onSubmit,
  placeholder = 'Leave a comment',
  autoFocus = false,
  isSubmitting = false,
  className,
}: CommentComposerProps) {
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    const text = value.trim();
    if (!text || isSubmitting) return;
    await onSubmit(text);
    setValue('');
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full  bg-[#f5f5f5] px-4 py-3',
        className,
      )}
    >
      {/* <Avatar size="sm">
          <AvatarFallback>{blog.author.initials}</AvatarFallback>
        </Avatar> */}
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        disabled={isSubmitting}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={placeholder}
        className="flex-1 bg-[#f5f5f5] text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !value.trim()}
        aria-label="Send comment"
        className="flex shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <SendHorizontal size={18} />
      </button>
    </div>
  );
}
