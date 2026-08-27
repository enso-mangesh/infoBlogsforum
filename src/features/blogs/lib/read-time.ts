import { BlogContentType } from '../blog.type';

export function calculateReadTime(content: BlogContentType): number {
  if (!content) return 1;

  let text = '';

  if (typeof content === 'string') {
    text = content;
  } else {
    text = [
      content.summary,
      ...content.highlights,
      content.whyItMatters,
    ].join(' ');
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const WORDS_PER_MINUTE = 200;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}