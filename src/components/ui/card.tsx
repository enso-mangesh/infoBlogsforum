import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

function Card({
  className,
  size = 'default',
  selected = false,
  interactive = false,
  color = 'var(--green-primary)',
  backgroundColor,
  borderColor,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  size?: 'default' | 'sm';
  selected?: boolean;
  interactive?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-selected={selected}
      className={cn(
        'group/card relative flex flex-col gap-(--card-spacing) overflow-hidden rounded-2xl border border-stroke bg-white text-sm text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        interactive &&
          'cursor-pointer transition-colors hover:shadow-lg',
        className,
      )}
      style={{
        borderColor: borderColor ?? (selected ? color : undefined),
        backgroundColor:
          backgroundColor ??
          (selected ? `color-mix(in srgb, ${color} 8%, white)` : undefined),
        ...style,
      }}
      {...props}
    >
      {children}
      {selected && (
        <span
          data-slot="card-selected-badge"
          className="absolute top-4 right-4 flex size-6 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      )}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl p-0 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-subtext', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardIcon({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-icon"
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground [&_svg]:size-6 group-data-[selected=true]/card:bg-white',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-0', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardIcon,
};

export default Card;