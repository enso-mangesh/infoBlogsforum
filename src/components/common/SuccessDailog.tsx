'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SuccessDialogProps {
  open: boolean;
  onDone: () => void;
  title: string;
  description: string;
  buttonText?: string;
}

export function SuccessDialog({
  open,
  onDone,
  title,
  description,
  buttonText = 'OK',
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onDone()}>
      <DialogContent
        className="rounded-4xl border-none bg-white p-8 text-center shadow-xl sm:max-w-110 [&>button]:hidden"
      >
        <DialogHeader className="flex flex-col items-center justify-center space-y-0 text-center sm:text-center">
          {/* Success Icon */}
          <div className="mb-6 flex size-15 items-center justify-center rounded-full bg-[#52AA17]">
            <Check className="size-7 text-white" strokeWidth={3} />
          </div>

          {/* Title */}
          <DialogTitle className="w-full text-center text-2xl font-semibold tracking-tight text-gray-900">
            {title}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="mt-3 w-full text-center text-sm leading-relaxed text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-8 w-full">
          <Button
            variant="primary"
            size="xs"
            onClick={onDone}
            className="w-full"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}