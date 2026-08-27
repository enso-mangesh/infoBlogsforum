'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  containerClassName = '',
}: SearchInputProps) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      leftIcon={<Search />}
      containerClassName={containerClassName}
      className={className}
    />
  );
}