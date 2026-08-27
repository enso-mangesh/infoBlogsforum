"use client";

import { useState } from "react";

import {
  useEditor,
  EditorContent,
  useEditorState,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Markdown } from "@tiptap/markdown";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Palette,
  Code,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getImageFileError,
  getVideoEmbedInfo,
  getVideoUrlError,
  readFileAsDataUrl,
} from "@/features/blogs/utils/blog.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Video } from "../extentions/tiptap-video-extension";


interface BlogEditorProps {
  value?: string;
  contentFormat?: "html" | "markdown";
  onChange?: (content: { html: string; markdown: string }) => void;
  placeholder?: string;
}
type EditorMode = "rich" | "markdown";

function MarkdownBadge() {
  return (
    <span className="flex h-4 w-5 shrink-0 items-center justify-center rounded-[3px] bg-foreground text-[9px] font-bold leading-none text-background">
      M↓
    </span>
  );
}

function EditorModeToggle({
  mode,
  onChange,
}: {
  mode: EditorMode;
  onChange: (mode: EditorMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
      <button
        type="button"
        aria-label="Rich Text"
        title="Rich Text"
        onClick={() => onChange("rich")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm transition-colors",
          mode === "rich"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Type size={14} />
        {mode === "rich" && "Rich"}
      </button>

      <button
        type="button"
        aria-label="Markdown"
        title="Markdown"
        onClick={() => onChange("markdown")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm transition-colors",
          mode === "markdown"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <MarkdownBadge />
        {mode === "markdown" && "Markdown"}
      </button>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isCodeBlock: ctx.editor.isActive('codeBlock'),
      isLink: ctx.editor.isActive("link"),
    }),
  });

  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkOpenInNewTab, setLinkOpenInNewTab] = useState(true);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoUrlError, setVideoUrlError] = useState<string | null>(null);

  const handleOpenLinkDialog = () => {
    const attrs = editor.getAttributes("link");
    setLinkUrl((attrs.href as string | undefined) ?? "");
    setLinkOpenInNewTab(attrs.target ? attrs.target === "_blank" : true);
    setLinkDialogOpen(true);
  };

  const handleApplyLink = () => {
    if (!linkUrl.trim()) {
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: linkUrl.trim(),
        target: linkOpenInNewTab ? "_blank" : null,
        rel: linkOpenInNewTab ? "noopener noreferrer" : null,
      })
      .run();
    setLinkDialogOpen(false);
  };

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkDialogOpen(false);
  };

  const handleImageFileSelected = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) {
      return;
    }
    const error = getImageFileError(file);
    if (error) {
      window.alert(error);
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
       editor
      .chain()
      .focus()
      .setImage({
        src: dataUrl,
      })
      .run();
  };

  const handleOpenVideoDialog = () => {
    setVideoUrl('');
    setVideoUrlError(null);
    setVideoDialogOpen(true);
  };

  const handleApplyVideo = () => {
    const error = getVideoUrlError(videoUrl);
    if (error) {
      setVideoUrlError(error);
      return;
    }

    const trimmedUrl = videoUrl.trim();
    const embedInfo = getVideoEmbedInfo(trimmedUrl);

    editor
      .chain()
      .focus()
      .setVideo({
        src: embedInfo.src,
        mode: embedInfo.kind,
      })
      .run();

    setVideoDialogOpen(false);
  };

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Bold",
      isActive: editorState.isBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      label: "Italic",
      isActive: editorState.isItalic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: UnderlineIcon,
      label: "Underline",
      isActive: editorState.isUnderline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: List,
      label: "Bullet list",
      isActive: editorState.isBulletList,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      label: "Ordered list",
      isActive: editorState.isOrderedList,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
      {
      icon: Code,
      label: 'Code block',
      isActive: editorState.isCodeBlock,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      icon: Quote,
      label: "Blockquote",
      isActive: editorState.isBlockquote,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: LinkIcon,
      label: "Link",
      isActive: editorState.isLink,
      onClick: handleOpenLinkDialog,
    },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
      {toolbarButtons.map(({ icon: Icon, label, isActive, onClick }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          title={label}
          onClick={onClick}
          className={cn(
          'rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted',
            isActive && "bg-muted text-foreground",
          )}
        >
          <Icon size={16} />
        </button>
      ))}
      <div className="mx-1 h-5 w-px bg-border" />
      <label
        aria-label="Image"
        title="Image"
        className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
      >
        <ImageIcon size={16} />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileSelected}
          hidden
        />
      </label>  <button
        type="button"
        aria-label="Video"
        title="Video"
        onClick={handleOpenVideoDialog}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
      >
        <VideoIcon size={16} />
      </button>
      <label
        aria-label="Text color"
        title="Text color"
        className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
      >
        <Palette size={16} />
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          hidden
        />
      </label>

      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editorState.isLink ? "Edit link" : "Add link"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              autoFocus
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApplyLink();
                }
              }}
            />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox
                checked={linkOpenInNewTab}
                onCheckedChange={(checked) =>
                  setLinkOpenInNewTab(checked === true)
                }
              />
              Open in new tab
            </label>
          </div>
          <DialogFooter>
            {editorState.isLink && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRemoveLink}
              >
                Remove link
              </Button>
            )}
            <Button type="button" onClick={handleApplyLink}>
              {editorState.isLink ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
       <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert video</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Input
              autoFocus
              placeholder="Insert video URL"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setVideoUrlError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyVideo();
                }
              }}
            />
            {videoUrlError && (
              <p className="text-sm text-destructive">{videoUrlError}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleApplyVideo}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function BlogEditor({
  value = '',
  contentFormat = 'html',
  onChange,
  placeholder = "Start writing your blog...",
}: BlogEditorProps) {
  const [mode, setMode] = useState<EditorMode>('rich');

  const [markdown, setMarkdown] = useState('');
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: false,
      }),

      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      Video,
      TextStyle,
      Color,
      Markdown
    ],
      content: contentFormat === 'markdown' ? value : value,
    onCreate: ({ editor }) => {
      const initialMarkdown = editor.getMarkdown();
      setMarkdown(initialMarkdown);
      onChange?.({
        html: editor.getHTML(),
        markdown: initialMarkdown,
      });
    },
    onUpdate: ({ editor }) => {
        const html = editor.getHTML();
      const markdownContent = editor.getMarkdown();
      setMarkdown(markdownContent);
      onChange?.({
        html,
        markdown: markdownContent,
      });
    },
    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-sm max-w-none min-h-[220px] px-3 py-2 focus:outline-none dark:prose-invert",
      },
    },
  });
   const switchToMarkdown = () => {
    if (!editor) {
      return;
    }
    const currentMarkdown = editor.getMarkdown();
    setMarkdown(currentMarkdown);
    setMode('markdown');
  };

  const switchToRichText = () => {
    if (!editor) {
      return;
    }
    editor.commands.setContent(markdown, {
      contentType: 'markdown',
    });
    setMode('rich');
    onChange?.({
      html: editor.getHTML(),
      markdown: editor.getMarkdown(),
    });
  };
  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    onChange?.({
      html: editor?.getHTML() ?? '',
      markdown: value,
    });
  };

  if (!editor) {
    return <Skeleton className="h-70 w-full rounded-xl" />;
  }

  return (
     <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border px-2 py-2">
        <EditorModeToggle
          mode={mode}
          onChange={(nextMode) => {
            if (nextMode === mode) {
              return;
            }

            if (nextMode === 'markdown') {
              switchToMarkdown();
            } else {
              switchToRichText();
            }
          }}
        />
      </div>
      {mode === 'rich' && (
        <>
          <Toolbar editor={editor} />

          <EditorContent editor={editor} />
        </>
      )}

      {mode === 'markdown' && (
        <textarea
          value={markdown}
          onChange={(e) => handleMarkdownChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          className={cn(
            'min-h-70 w-full resize-y',
            'bg-background px-4 py-3',
            'font-mono text-sm leading-6',
            'text-foreground',
            'placeholder:text-muted-foreground',
            'focus:outline-none',
          )}
        />
      )}
    </div>
  );
}
