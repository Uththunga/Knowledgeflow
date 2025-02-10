import { useState } from "react";
import LibraryHeader from "@/components/library/LibraryHeader";
import BookGrid from "@/components/library/BookGrid";

export default function LibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <LibraryHeader
          view={view}
          onViewChange={setView}
          onSearch={setSearchQuery}
        />
        <BookGrid />
      </div>
    </div>
  );
}
