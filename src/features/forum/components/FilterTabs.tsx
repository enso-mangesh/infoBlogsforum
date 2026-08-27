'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FILTER_TABS } from '../data/discussion';


type FilterTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const FilterTabs = ({ activeTab, onTabChange }: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* <div className="flex flex-wrap items-center gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-normal transition-colors',
              activeTab === tab
                ? 'border-primary-green bg-light-green text-black'
                : 'border-gray-200 text-black hover:bg-muted',
            )}
          >
            {tab}
          </button>
        ))}
      </div> */}

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-black hover:bg-muted"
        >
          Sort by: Latest
          <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default FilterTabs;