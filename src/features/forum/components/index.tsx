"use client";

import { useState } from "react";
import { useDiscussionsStore } from "../store/useDiscussionstore";
import PromoBanner from "./PromoBanner";
import RecentDiscussions from "./RecentDiscussion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SortDropdown from "@/features/blogs/components/SortDropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";

const Forum = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("new-old");
  const [search, setSearch] = useState("");
  const discussions = useDiscussionsStore((state) => state.discussions);

  const filteredDiscussions =
    activeTab === "All"
      ? discussions
      : discussions.filter((discussion) => discussion.tags.includes(activeTab));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-full ">
        {/* <h1 className="mb-4 text-5xl font-bold sm:text-3xl">
            Forum
        </h1>
        <FilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        /> */}
        <div className="hidden md:flex items-center justify-between">
          <h1 className="text-4xl font-semibold">Forum</h1>

          <div className="flex items-center gap-3">

            <Button variant="primary" size="sm" asChild>
              <Link href="/forum/ask">Share a case</Link>
            </Button>

            <SortDropdown value={sortBy} onChange={setSortBy} />

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
              <SlidersHorizontal className="h-6 w-6" />
            </button>
            {/* <ThemeToggle /> */}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <h1 className="text-3xl font-semibold">Forum</h1>

          <div className="mt-4 flex items-center gap-3">
            {/* <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search forums..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 outline-none"
              />
            </div> */}

            <SortDropdown value={sortBy} onChange={setSortBy} />

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </div>

          <button className="fixed bottom-4 left-4 right-4 z-50 h-10 rounded-full bg-lime-500 text-center text-md font-semibold text-white shadow-lg">
            Share a Case
          </button>
        </div>

        <PromoBanner />

        <RecentDiscussions discussions={filteredDiscussions} />
      </div>
    </div>
  );
};

export default Forum;
