"use client";

import { useEffect, useRef, useState } from "react";
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
import { useBlogStore } from "../store/blog-store";
import { getImageFileError, readFileAsDataUrl } from "../utils/blog.utils";
import { BlogEditor } from "./BlogEditor";
import { ThumbnailCropperDialog } from "./ThumbnailCropperDialog";
import { Blog } from "../blog.type";
import { SuccessDialog } from '@/components/common/SuccessDailog';

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

export function CreateBlogForm({ blog }: CreateBlogFormProps) {
  const router = useRouter();
  const submitForApproval = useBlogStore((state) => state.submitForApproval);
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

  const saveDraft = useBlogStore((state) => state.saveDraft);
  const submittedRef = useRef(false);

  const blogId = existingBlog?.id;

  const onSubmit = (values: BlogFormSchema) => {
    submittedRef.current = true;

    submitForApproval(values, blogId);

    setShowSubmittedDialog(true);
  };

  const handleSaveDraft = () => {
    const values = getValues();

    if (!hasFormData(values)) {
      router.push(ROUTES.MY_BLOGS);
      return;
    }

    submittedRef.current = true;

    saveDraft(values, blogId);

    router.push(ROUTES.MY_BLOGS);
  };

  useEffect(() => {
    return () => {
      if (submittedRef.current) return;

      const values = getValues();

      if (!hasFormData(values)) return;

      saveDraft(values, blogId);
    };
  }, [blogId, getValues, saveDraft]);
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
                  <span className="text-sm text-gray-500">Add blog thumbnail</span>
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
