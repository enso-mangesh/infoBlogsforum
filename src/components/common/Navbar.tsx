'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { BookOpen, MessageSquare } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  // Active status detection
  const isBlogsActive =
    pathname === '/' || pathname.startsWith('/blogs');

  const isMyBlogsActive =
    pathname === '/my-blogs' || pathname.startsWith('/my-blogs/');

  const isForumActive =
    pathname === '/forum' || pathname.startsWith('/forum/');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-1 sm:gap-2">
            {/* Blogs */}
            <Link
              href="/blogs"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isBlogsActive
                  ? 'bg-primary font-semibold text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Blogs
            </Link>

            {/* My Blogs */}
            <Link
              href="/my-blogs"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isMyBlogsActive
                  ? 'bg-primary font-semibold text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              My Blogs
            </Link>

            {/* Forum */}
            <Link
              href="/forum"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isForumActive
                  ? 'bg-primary font-semibold text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Forum
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;