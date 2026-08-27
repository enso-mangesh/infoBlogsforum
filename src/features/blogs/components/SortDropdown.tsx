'use client';

import { ArrowUpDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { label: "Last added", value: "latest" },
  { label: "New to old", value: "new-old" },
  { label: "Old to new", value: "old-new" },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortDropdown({
  value,
  onChange,
}: Props) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <ArrowUpDown className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-35 md:w-45 rounded-3xl border-0 bg-white p-2 shadow-xl"
      >
        {options.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => onChange(item.value)}
            className="flex h-8 md:h-12 cursor-pointer items-center justify-between rounded-xl px-4 text:md md:text-lg"
          >
            {item.label}

            {value === item.value && (
              <Check className="h-5 w-5 text-green-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}