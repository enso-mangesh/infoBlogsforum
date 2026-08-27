'use client';

import { ArrowLeft, Eye, FileText, MessagesSquare, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useDiscussionsStore } from '../store/useDiscussionstore';
import { slugify } from '../utils/slug';


type DiscussionDetailProps = {
  slug: string;
};

const formatFileSize = (bytes: number) =>
  `${(bytes / (1024 * 1024)).toFixed(1)}MB`;

const DiscussionDetail = ({ slug }: DiscussionDetailProps) => {
  const router = useRouter();
  const discussion = useDiscussionsStore((state) =>
    state.discussions.find((item) => slugify(item.title) === slug),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full hover:bg-muted"
        >
          <ArrowLeft className="size-5 text-text-foreground" />
        </button> */}

        {!discussion ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-base font-medium text-text-foreground">
              Discussion not found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              It may have been removed, or the page was refreshed.
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback className="bg-gray-100 text-gray-400">
                  <User className="size-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="text-sm font-medium text-black capitalize">
                  {discussion.name}
                </p>
                {discussion.role && (
                  <p className="text-xs font-normal text-black">
                    {discussion.role}
                  </p>
                )}
              </div>

              <span className="text-xs text-[#696969]">
                {discussion.postedAgo}
              </span>
            </div>

            {discussion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {discussion.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f4f4f8] px-2.5 py-1 text-[10px] text-[#696969]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-base font-semibold text-black">
              {discussion.title}
            </p>

            {discussion.description && (
              <p className="text-sm font-normal whitespace-pre-line text-black">
                {discussion.description}
              </p>
            )}

            {discussion.attachment && (
              <a
                href={discussion.attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#f5f5f5] p-4 hover:bg-muted"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
                  <FileText className="size-4 text-[#757575]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-foreground">
                    {discussion.attachment.name}
                  </p>
                  <p className="text-[10px] text-[#696969]">
                    {formatFileSize(discussion.attachment.size)}
                  </p>
                </div>
              </a>
            )}

            <div className="flex items-center justify-end border-t border-gray-100 pt-4 text-[13px] text-[#696969]">
              <span className="flex items-center gap-1.5">
                <Eye className="size-4" />
                {discussion.views} views
              </span>
            </div>
          </div>
        )}

        {discussion && (
          <div className="mt-6">
            <p className="flex items-center gap-1.5 text-sm text-[#696969]">
              <MessagesSquare className="size-4" />
              {discussion.replies} replies
            </p>

            {discussion.replies === 0 && (
              <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-10 text-center">
                <p className="text-sm text-muted-foreground">No replies yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionDetail;