import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Bookmark } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  isActive: boolean;
}

interface Bookmark {
  id: string;
  title: string;
  chapter: string;
}

interface SidePanelProps {
  isOpen?: boolean;
  chapters?: Chapter[];
  bookmarks?: Bookmark[];
  onChapterSelect?: (chapterId: string) => void;
  onBookmarkSelect?: (bookmarkId: string) => void;
  onClose?: () => void;
}

const SidePanel = ({
  isOpen = true,
  chapters = [
    { id: "1", title: "Chapter 1: The Beginning", isActive: true },
    { id: "2", title: "Chapter 2: The Journey", isActive: false },
    { id: "3", title: "Chapter 3: The Climax", isActive: false },
  ],
  bookmarks = [
    { id: "1", title: "Important Scene", chapter: "Chapter 1" },
    { id: "2", title: "Plot Twist", chapter: "Chapter 2" },
  ],
  onChapterSelect = () => {},
  onBookmarkSelect = () => {},
  onClose = () => {},
}: SidePanelProps) => {
  if (!isOpen) return null;

  return <></>;
};

export default SidePanel;
