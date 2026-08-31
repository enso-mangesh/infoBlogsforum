"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ROUTES } from "@/core/config/routes";
import { blogFormSchema, BlogFormSchema } from "../blog.schema";
import { getImageFileError, readFileAsDataUrl } from "../utils/blog.utils";
import { BlogEditor } from "./BlogEditor";
import { ThumbnailCropperDialog } from "./ThumbnailCropperDialog";
import { Blog } from "../blog.type";
import { SuccessDialog } from "@/components/common/SuccessDailog";
import { createBlog, updateBlog, submitBlog } from "../services/blog-action";

interface CreateBlogFormProps {
  blog?: Blog;
}
const hasFormData = (values: BlogFormSchema) => {
  return Boolean(
    values.title?.trim() ||
    values.content?.trim() ||
    values.keywords?.trim() ||
    values.thumbnail,
  );
};
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export function CreateBlogForm({ blog }: CreateBlogFormProps) {
  const router = useRouter();

  const existingBlog = blog;
  const [showSubmittedDialog, setShowSubmittedDialog] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const pendingThumbnailChange = useRef<((value: string) => void) | null>(null);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<BlogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: existingBlog?.title ?? "",
      // category: existingBlog?.category ?? '',
      // readTime: existingBlog?.readTime ?? '',
      keywords: existingBlog?.keywords ? existingBlog.keywords.join(", ") : "",
      content:
        typeof existingBlog?.content === "string"
          ? existingBlog.content
          : (existingBlog?.content?.summary ?? ""),
      thumbnail: existingBlog?.thumbnail ?? existingBlog?.image ?? null,
      confirmOriginal: false,
    },
  });

  const handleThumbnailSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string | null) => void,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const fileError = getImageFileError(file);
    if (fileError) {
      setThumbnailError(fileError);
      return;
    }

    setThumbnailError(null);
    const dataUrl = await readFileAsDataUrl(file);
    pendingThumbnailChange.current = onChange;
    setCropperImage(dataUrl);
  };

  const handleCropCancel = () => {
    setCropperImage(null);
    pendingThumbnailChange.current = null;
  };

  const handleCropped = (dataUrl: string) => {
    pendingThumbnailChange.current?.(dataUrl);
    setCropperImage(null);
    pendingThumbnailChange.current = null;
  };

  const submittedRef = useRef(false);

  const blogId = existingBlog?.id;

 const onSubmit = async (values: BlogFormSchema) => {
  submittedRef.current = true;

  const slug = generateSlug(values.title);

  console.log("BLOG FORM VALUES:", values);
  console.log("BLOG SLUG:", slug);

  try {
    let result;

    if (blogId) {
      result = await updateBlog(String(blogId), {
        title: values.title,
        content: values.content,
        thumbnail: values.thumbnail ?? undefined,
      });

      if (!result.success) {
        console.error("Failed to update blog:", result.error);
        return;
      }

      const submitResult = await submitBlog(String(blogId));

      if (!submitResult.success) {
        console.error(
          "Failed to submit blog:",
          submitResult.error,
        );
        return;
      }
    } else {
      result = await createBlog({
        title: values.title,
        slug,
        content: values.content,
        status: "DRAFT",
      });

      if (!result.success) {
        console.error(
          "Failed to create blog:",
          result.error,
        );
        return;
      }

      console.log("Blog created:", result);
    }

    setShowSubmittedDialog(true);
  } catch (error) {
    console.error("Blog submission failed:", error);
  }
};
  const handleSaveDraft = async () => {
    const values = getValues();

    if (!hasFormData(values)) {
      router.push(ROUTES.MY_BLOGS);
      return;
    }

    submittedRef.current = true;

    const slug = generateSlug(values.title);

    try {
      let result;

      if (blogId) {
        // Existing blog
        result = await updateBlog(String(blogId), {
          title: values.title,
          content: values.content,
          thumbnail: values.thumbnail ?? undefined,
        });
      } else {
        // New blog
        result = await createBlog({
          title: values.title,
          slug,
          content: values.content,
          status: "DRAFT",
          thumbnail: values.thumbnail ?? undefined,
        });
      }

      if (!result.success) {
        console.error("Failed to save draft:", result.error);
        return;
      }

      console.log("Draft saved:", result);

      router.push(ROUTES.MY_BLOGS);
    } catch (error) {
      console.error("Save draft failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-5">
        <Input
          placeholder="e.g. Managing Thyroid Disorders"
          error={errors.title?.message}
          {...register("title")}
        />

        <Input
          placeholder="Comma-separated, e.g. thyroid, hormones"
          {...register("keywords")}
        />

        <div className="space-y-2">
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) =>
              field.value ? (
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={field.value}
                    alt="Blog thumbnail"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove thumbnail"
                    onClick={() => field.onChange(null)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground hover:bg-muted/40 transition-colors">
                  <ImagePlus size={20} />
                  <span className="text-sm text-gray-500">
                    Add blog thumbnail
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={(event) =>
                      handleThumbnailSelected(event, field.onChange)
                    }
                  />
                </label>
              )
            }
          />
          {thumbnailError && (
            <p className="text-sm text-destructive">{thumbnailError}</p>
          )}
        </div>

        <div className="space-y-2 w-full">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <BlogEditor
                value={field.value}
                onChange={(content) => field.onChange(content.html)}
              />
            )}
          />
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Controller
              name="confirmOriginal"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="confirmOriginal"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
              )}
            />
            <label
              htmlFor="confirmOriginal"
              className="text-sm font-normal text-muted-foreground"
            >
              I confirm this content is original and not copied from another
              source. I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                className="underline text-foreground"
              >
                Terms &amp; Conditions
              </Link>
              .
            </label>
          </div>
          {errors.confirmOriginal && (
            <p className="text-sm text-destructive">
              {errors.confirmOriginal.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
          >
            Save as draft
          </Button>

          <Button variant="primary" size="sm" type="submit">
            Submit for approval
          </Button>
        </div>
      </form>

      <SuccessDialog
        open={showSubmittedDialog}
        title="Blog submitted for review!"
        description="Your blog will be reviewed within 24–48 hours. You'll be notified once it's approved and published."
        buttonText="OK"
        onDone={() => {
          setShowSubmittedDialog(false);
          router.push(ROUTES.MY_BLOGS);
        }}
      />

      <ThumbnailCropperDialog
        image={cropperImage}
        onCancel={handleCropCancel}
        onCropped={handleCropped}
      />
    </>
  );
}
