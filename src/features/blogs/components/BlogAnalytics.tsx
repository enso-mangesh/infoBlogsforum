'use client';

import { StatCard } from '@/features/blogs/components/StatCard';
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { AudienceBreakdown } from './AudienceBreakdown';


const stats = [
  {
    icon: BarChart3,
    iconClassName: 'bg-blue-50 text-blue-600',
    value: '48.2K',
    label: 'Total views',
    change: '34%',
  },
  {
    icon: Users,
    iconClassName: 'bg-orange-50 text-orange-600',
    value: '4,820',
    label: 'Profile visits',
    change: '41%',
  },
  {
    icon: Eye,
    iconClassName: 'bg-purple-50 text-purple-600',
    value: '31.4K',
    label: 'Avg. read time',
    change: '28%',
  },
  {
    icon: TrendingUp,
    iconClassName: 'bg-green-50 text-green-600',
    value: '312',
    label: 'New bookings',
    change: '18%',
  },
];

export function BlogAnalytics() {
  return (
    <>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          iconClassName={stat.iconClassName}
          value={stat.value}
          label={stat.label}
          change={stat.change}
        />
      ))}
    </div>
    </>
  );
}