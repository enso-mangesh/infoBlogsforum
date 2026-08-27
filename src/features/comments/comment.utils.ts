import type { CommentItemData } from './comment.types';

const UNITS: [seconds: number, label: string][] = [
  [31536000, 'y'],
  [2592000, 'mo'],
  [604800, 'w'],
  [86400, 'd'],
  [3600, 'h'],
  [60, 'm'],
];

export function formatTimeAgo(date: string | Date): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - value.getTime()) / 1000);

  for (const [secondsInUnit, label] of UNITS) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) return `${count}${label} ago`;
  }
  return 'just now';
}

export function countAllComments(comments: CommentItemData[]): number {
  return comments.reduce(
    (total, comment) => total + 1 + (comment.replies?.length ?? 0),
    0,
  );
}
