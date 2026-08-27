import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-lg border border-transparent",
    "bg-clip-padding",
    "text-sm font-medium whitespace-nowrap",
    "transition-all outline-none select-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50",
    "dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    '[&_svg:not([class*="size-"])]:size-4',
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-lime-500 text-white hover:bg-lime-600",

        outline: "border-black bg-background hover:bg-muted",

        secondary:
          "bg-secondary-cta-background text-white hover:bg-transparent hover:text-secondary-cta-background hover:border-secondary-cta-background",

        ghost: "bg-transparent hover:bg-muted hover:text-foreground",

        destructive: "bg-destructive text-white hover:bg-destructive/90",

        ai: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100",

        link: "bg-transparent p-0 text-error font-light underline-offset-4 hover:underline",

        success: "bg-cta-background text-white hover:bg-cta-background/90",
      },

      size: {
        xs: 'h-12 gap-1.5 w-full rounded-lg px-8 text-md',

        sm: 'h-12 gap-1.5 rounded-lg px-8 text-md',

        default: "h-9 px-3 rounded",

        lg: "h-12 rounded-full px-5",

        xl: "h-11 gap-2 rounded-xl px-6 text-base",

        icon: "size-8",

        "icon-xs": 'size-6 rounded-md [&_svg:not([class*="size-"])]:size-3',

        "icon-sm": "size-7 rounded-lg",

        "icon-lg": "size-9",
      },

      width: {
        auto: "w-auto",
        full: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
      width: "auto",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;

  /**
   * Shows loading spinner and disables the button.
   */
  loading?: boolean;

  /**
   * Text displayed inside the button.
   * Children can also be used instead.
   */
  text?: string;

  /**
   * Optional icon.
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon.
   */
  iconPosition?: "left" | "right";

  /**
   * Optional text while loading.
   */
  loadingText?: string;
}

function Button({
  className,
  variant = "primary",
  size = "default",
  width = "auto",
  asChild = false,
  loading = false,
  text,
  icon,
  iconPosition = "left",
  loadingText,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  const content = text ?? children;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      className={cn(
        buttonVariants({
          variant,
          size,
          width,
          className,
        }),
      )}
      {...props}
    >
      {loading ? (
        <div>
          <Loader2 className="size-4 animate-spin" />
          {loadingText ?? content}
        </div>
      ) : (
        <div>
          {icon && iconPosition === "left" && icon}
          {content}
          {icon && iconPosition === "right" && icon}
        </div>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
