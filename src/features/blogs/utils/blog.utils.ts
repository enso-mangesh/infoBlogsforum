export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function getImageFileError(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Please select a valid image file (PNG, JPEG, WEBP, or GIF).';
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'Image must be smaller than 5MB.';
  }
  return null;
}
export type VideoEmbedKind = 'embed' | 'file' | 'link';

export interface VideoEmbedInfo {
  kind: VideoEmbedKind;
  src: string;
}

const DIRECT_VIDEO_FILE_REGEX =
  /\.(mp4|webm|ogg|ogv|mov|m4v|avi|mkv|flv)(\?.*)?$/i;

export function getVideoEmbedInfo(url: string): VideoEmbedInfo {
  const trimmed = url.trim();

  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (youtubeMatch) {
    return {
      kind: 'embed',
      src: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    };
  }

  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:video\/|channels\/[^/]+\/)?(\d+)/,
  );
  if (vimeoMatch) {
    return {
      kind: 'embed',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  const dailymotionMatch = trimmed.match(
    /dailymotion\.com\/(?:video\/|embed\/video\/)([a-zA-Z0-9]+)|dai\.ly\/([a-zA-Z0-9]+)/,
  );
  if (dailymotionMatch) {
    return {
      kind: 'embed',
      src: `https://www.dailymotion.com/embed/video/${dailymotionMatch[1] ?? dailymotionMatch[2]}`,
    };
  }

  const loomMatch = trimmed.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (loomMatch) {
    return { kind: 'embed', src: `https://www.loom.com/embed/${loomMatch[1]}` };
  }

  const wistiaMatch = trimmed.match(
    /(?:wistia\.com|wi\.st)\/(?:medias|embed\/(?:iframe|medias))\/([a-zA-Z0-9]+)/,
  );
  if (wistiaMatch) {
    return {
      kind: 'embed',
      src: `https://fast.wistia.net/embed/iframe/${wistiaMatch[1]}`,
    };
  }

  const streamableMatch = trimmed.match(
    /streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/,
  );
  if (streamableMatch) {
    return {
      kind: 'embed',
      src: `https://streamable.com/e/${streamableMatch[1]}`,
    };
  }

  if (/facebook\.com\/.*\/videos\/|fb\.watch\//.test(trimmed)) {
    return {
      kind: 'embed',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}`,
    };
  }

  if (DIRECT_VIDEO_FILE_REGEX.test(trimmed)) {
    return { kind: 'file', src: trimmed };
  }

  return { kind: 'link', src: trimmed };
}

export function getVideoUrlError(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) {
    return 'Please enter a video URL.';
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return 'Please enter a valid URL starting with http:// or https://.';
  }
  return null;
}
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getExcerpt(html: string, maxLength = 140): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
