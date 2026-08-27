import { BlogAuthor } from '../blog.type';

type AuthorInfoProps = {
  author: string | BlogAuthor;
  specialization?: string;
};

export default function AuthorInfo({
  author,
  specialization,
}: AuthorInfoProps) {
  const authorName = typeof author === 'string' ? author : author?.name ?? '';
  const authorSpec =
    specialization || (typeof author !== 'string' ? author?.specialty : undefined) || '';

  const initials = authorName
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
        {initials}
      </div>

      <div className="flex flex-col">
        <span className="text-md font-semibold text-gray-700">
          {authorName}
        </span>
        {authorSpec ? (
          <span className="text-sm text-gray-500">
            {authorSpec}
          </span>
        ) : null}
      </div>
    </div>
  );
}