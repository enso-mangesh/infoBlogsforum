'use client';

import { useRef } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const THUMBNAIL_ASPECT_RATIO = 16 / 9;

interface ThumbnailCropperDialogProps {
  image: string | null;
  onCancel: () => void;
  onCropped: (dataUrl: string) => void;
}

export function ThumbnailCropperDialog({
  image,
  onCancel,
  onCropped,
}: ThumbnailCropperDialogProps) {
  const cropperRef = useRef<CropperRef>(null);

  const handleSave = () => {
    const canvas = cropperRef.current?.getCanvas();
    if (!canvas) return;
    onCropped(canvas.toDataURL('image/jpeg', 0.92));
  };

  return (
    <Dialog open={image !== null} onOpenChange={(next) => !next && onCancel()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Crop thumbnail</DialogTitle>
        </DialogHeader>

        {image && (
          <Cropper
            ref={cropperRef}
            src={image}
            className="h-80 w-full rounded-lg bg-muted"
            stencilProps={{ aspectRatio: THUMBNAIL_ASPECT_RATIO }}
          />
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
