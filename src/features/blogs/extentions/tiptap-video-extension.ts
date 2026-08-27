import { Node, mergeAttributes } from '@tiptap/core';

export interface VideoOptions {
  HTMLAttributes: Record<string, unknown>;
}

export type VideoMode = 'embed' | 'file' | 'link';

export interface SetVideoOptions {
  src: string;
  mode?: VideoMode;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: SetVideoOptions) => ReturnType;
    };
  }
}

const EMBED_IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

export const Video = Node.create<VideoOptions>({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      mode: {
        default: 'file',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src]',
        getAttrs: (element) => ({
          src: (element as HTMLElement).getAttribute('src'),
          mode: 'embed',
        }),
      },
      {
        tag: 'video[src]',
        getAttrs: (element) => ({
          src: (element as HTMLElement).getAttribute('src'),
          mode: 'file',
        }),
      },
      {
        tag: 'a.video-link[href]',
        getAttrs: (element) => ({
          src: (element as HTMLElement).getAttribute('href'),
          mode: 'link',
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, mode } = node.attrs as { src: string | null; mode: VideoMode };

    if (!src) {
      return ['div'];
    }

    if (mode === 'embed') {
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class:
            'video-embed relative aspect-video w-full overflow-hidden rounded-lg not-prose',
        }),
        [
          'iframe',
          {
            src,
            class: 'absolute inset-0 h-full w-full',
            frameborder: '0',
            allow: EMBED_IFRAME_ALLOW,
            allowfullscreen: 'true',
          },
        ],
      ];
    }

    if (mode === 'link') {
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: 'not-prose',
        }),
        [
          'a',
          {
            href: src,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'video-link text-primary underline underline-offset-4',
          },
          src,
        ],
      ];
    }

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'not-prose',
      }),
      ['video', { src, controls: 'true', class: 'w-full rounded-lg' }],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const { src, mode } = node.attrs as {
        src: string | null;
        mode: VideoMode;
      };

      const dom = document.createElement('div');

      dom.contentEditable = 'false';

      if (!src) {
        return { dom };
      }

      if (mode === 'embed') {
        dom.className =
          'video-embed relative aspect-video w-full overflow-hidden rounded-lg not-prose';

        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.className = 'absolute inset-0 h-full w-full';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', EMBED_IFRAME_ALLOW);
        iframe.setAttribute('allowfullscreen', 'true');
        dom.appendChild(iframe);
      } else if (mode === 'link') {
        dom.className = 'not-prose';

        const link = document.createElement('a');
        link.href = src;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'video-link text-primary underline underline-offset-4';
        link.textContent = src;
        dom.appendChild(link);
      } else {
        dom.className = 'not-prose';

        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.className = 'w-full rounded-lg';

        const errorNotice = document.createElement('p');
        errorNotice.className = 'hidden text-sm text-destructive';
        errorNotice.textContent =
          "This video can't be played in this browser. Try re-exporting it as MP4 (H.264) or WEBM.";

        video.addEventListener('error', () => {
          video.classList.add('hidden');
          errorNotice.classList.remove('hidden');
        });

        dom.appendChild(video);
        dom.appendChild(errorNotice);
      }

      return { dom };
    };
  },

  renderMarkdown: (node) => {
    const src = (node.attrs?.src as string) ?? '';
    if (!src) {
      return '';
    }

    const mode = node.attrs?.mode as VideoMode;

    if (mode === 'embed') {
      return `<div class="video-embed relative aspect-video w-full overflow-hidden rounded-lg not-prose"><iframe src="${src}" class="absolute inset-0 h-full w-full" allow="${EMBED_IFRAME_ALLOW}" allowfullscreen></iframe></div>`;
    }

    if (mode === 'link') {
      return `<div class="not-prose"><a href="${src}" class="video-link" target="_blank" rel="noopener noreferrer">${src}</a></div>`;
    }

    return `<div class="not-prose"><video src="${src}" controls class="w-full rounded-lg"></video></div>`;
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});