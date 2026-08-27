import { MoveUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StatCardProps } from '../blog.type';


export function StatCard({
  icon: Icon,
  iconClassName,
  label,
  value,
  change,
}: StatCardProps) {
  return (
    <Card className="rounded-3xl bg-neutral-100 dark:bg-gray-background p-4 shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex size-6 items-center justify-center rounded-2xl',
            iconClassName,
          )}
        >
          <Icon className="size-5" strokeWidth={2.2} />
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        <MoveUp className="size-3.5 " strokeWidth={2.4} />
        <span>{change}</span>
      </div>
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-md text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
}
