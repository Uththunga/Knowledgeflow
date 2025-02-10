import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  isActive: boolean;
}

interface Bookmark {
  id: string;
  title: string;
  chapter: string;
  position: number;
}

interface SidePanelProps {
  isOpen?: boolean;
  chapters?: Chapter[];
  bookmarks?: Bookmark[];
  onChapterSelect?: (chapterId: string) => void;
  onBookmarkSelect?: (bookmarkId: string) => void;
}

const SidePanel = ({
  isOpen = true,
  chapters = [
    { id: "1", title: "Chapter 1: The Beginning", isActive: true },
    { id: "2", title: "Chapter 2: The Journey", isActive: false },
    { id: "3", title: "Chapter 3: The Climax", isActive: false },
  ],
  bookmarks = [
    { id: "1", title: "Important Scene", chapter: "Chapter 1", position: 0.25 },
    { id: "2", title: "Plot Twist", chapter: "Chapter 2", position: 0.75 },
  ],
  onChapterSelect = () => {},
  onBookmarkSelect = () => {},
}: SidePanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  return (
    <div className="h-full bg-background/95 backdrop-blur-sm border-r transition-all duration-200">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={100}
          collapsible
          collapsedSize={4}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className="h-full"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
              <h2
                className={`text-lg font-semibold ${isCollapsed ? "hidden" : ""}`}
              >
                Contents
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
            </div>

            <ScrollArea className="flex-1">
              {!isCollapsed && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Chapters</h3>
                      <div className="space-y-1">
                        {chapters.map((chapter) => (
                          <Button
                            key={chapter.id}
                            variant={chapter.isActive ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => onChapterSelect(chapter.id)}
                          >
                            {chapter.title}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Bookmarks</h3>
                      <div className="space-y-1">
                        {bookmarks.map((bookmark) => (
                          <Button
                            key={bookmark.id}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => onBookmarkSelect(bookmark.id)}
                          >
                            <Bookmark className="mr-2 h-4 w-4" />
                            <div className="flex flex-col items-start">
                              <span>{bookmark.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {bookmark.chapter}
                              </span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SidePanel;
