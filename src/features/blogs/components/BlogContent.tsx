"use client";

import { useMemo, useState } from "react";
import BlogStats from "./BlogStats";
import BlogCard from "./BlogCard";
import SortDropdown from "./SortDropdown";
import { useBlogStore } from "../store/blog-store";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/core/config/routes";
import SearchInput from "@/components/common/SearchInput";

type BlogsContentProps = {
  isOwner: boolean;
};

export default function BlogsContent({ isOwner }: BlogsContentProps) {
  const blogs = useBlogStore((state) => state.blogs);

  const [sortBy, setSortBy] = useState("new-old");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredAndSortedBlogs = useMemo(() => {
    const filtered = blogs.filter((blog) => {
      const query = search.toLowerCase();

      const matchesSearch =
        blog.title.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.description?.toLowerCase().includes(query) ||
        blog.keywords?.some((keyword) => keyword.toLowerCase().includes(query));

      const matchesStatus =
        !selectedStatus ||
        blog.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    switch (sortBy) {
      case "old-new":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;

      case "latest":
      case "new-old":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return filtered;
  }, [blogs, sortBy, search, selectedStatus]);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* HEADER SECTION */}
      <div>
        {/* Desktop Header */}
        <div className="hidden w-full items-center justify-between gap-4 md:flex">
          <h1 className="shrink-0 text-4xl font-semibold">
            {isOwner ? "My Blogs" : "Blogs"}
          </h1>

          <div className="flex items-center gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search blogs..."
              containerClassName="w-80 shrink-0"
              className="h-12 rounded-xl border-gray-200"
            />
            {isOwner && (
              <Button variant="primary" size="sm" asChild>
                <Link href={ROUTES.CREATE_BLOG}>Write New Blog</Link>
              </Button>
            )}

            <SortDropdown value={sortBy} onChange={setSortBy} />

            {/* <button
              type="button"
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button> */}

            {/* <ThemeToggle /> */}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex flex-col gap-4 md:hidden">
          <h1 className="text-3xl font-semibold">
            {isOwner ? "My Blogs" : "Blogs"}
          </h1>

          <div className="flex w-full items-center gap-2">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search blogs..."
              containerClassName="w-55 shrink-0"
              className="h-12 rounded-xl border-gray-200"
            />

            <SortDropdown value={sortBy} onChange={setSortBy} />

            {/* <button
              type="button"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button> */}
          </div>

          {isOwner && (
            <Button
              asChild
              className="fixed bottom-4 left-4 right-4 z-50 h-12 rounded-full bg-lime-500 text-center font-semibold text-white shadow-lg hover:bg-lime-600"
            >
              <Link href={ROUTES.CREATE_BLOG}>Write New Blog</Link>
            </Button>
          )}
        </div>
      </div>

      {/* STATS SECTION */}
      {isOwner && (
        <div className="w-full">
          <BlogStats
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
          />
        </div>
      )}

      {/* BLOG CARDS GRID */}
      <div className="grid w-full md:grid-cols-2 gap-6">
        {filteredAndSortedBlogs.length > 0 ? (
          filteredAndSortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center font-medium text-gray-500">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
}
