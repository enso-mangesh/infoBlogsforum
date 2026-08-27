import Link from 'next/link';
import { Eye, MessagesSquare, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { slugify } from '../utils/slug';
import { Discussion } from '../types/forum.types';

type DiscussionCardProps = {
  discussion: Discussion;
};

const DiscussionCard = ({ discussion }: DiscussionCardProps) => {
  return (
    <Link
      href={`/forum/${slugify(discussion.title)}`}
      className="block h-full"
    >
      <Card
        interactive
        className="h-full border-gray-200 bg-white"
      >
        <CardContent className="flex h-full flex-col gap-4 p-4">
          {/* User */}
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-gray-100 text-gray-400">
                <User className="size-5" />
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium capitalize text-black">
                {discussion.name}
              </p>

              {discussion.role && (
                <p className="text-xs font-normal text-black">
                  {discussion.role}
                </p>
              )}
            </div>
          </div>

          {/* Discussion */}
          <div>
            <p className="line-clamp-2 text-sm font-medium text-black">
              {discussion.title}
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/30 px-2.5 py-1 text-[10px] text-primary-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-[13px] text-[#696969]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <MessagesSquare className="size-4" />
                {discussion.replies} replies
              </span>

              <span className="flex items-center gap-1.5">
                <Eye className="size-4" />
                {discussion.views}
              </span>
            </div>

            <span>{discussion.postedAgo}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DiscussionCard;