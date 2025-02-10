import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ContentAreaProps {
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  theme?: "light" | "dark";
  onScroll?: (progress: number) => void;
}

const ContentArea = ({
  content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  fontSize = 16,
  fontFamily = "serif",
  theme = "light",
  onScroll,
}: ContentAreaProps) => {
  const [currentFontSize, setCurrentFontSize] = useState(fontSize);

  const handleFontSizeChange = (value: number[]) => {
    setCurrentFontSize(value[0]);
  };

  return (
    <div
      className={cn(
        "w-full h-full p-8 bg-background transition-colors duration-200",
        theme === "light" ? "bg-white text-black" : "bg-slate-900 text-white",
      )}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Font size controls */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentFontSize(Math.max(12, currentFontSize - 2))
            }
          >
            A-
          </Button>
          <Slider
            defaultValue={[currentFontSize]}
            max={24}
            min={12}
            step={1}
            onValueChange={handleFontSizeChange}
            className="w-[200px]"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentFontSize(Math.min(24, currentFontSize + 2))
            }
          >
            A+
          </Button>
        </div>

        {/* Content area */}
        <ScrollArea className="h-[calc(100vh-12rem)] w-full rounded-lg border bg-white/50 dark:bg-slate-950/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-200">
          <div
            style={{
              fontSize: `${currentFontSize}px`,
              fontFamily,
              lineHeight: 1.6,
            }}
            className="prose dark:prose-invert max-w-none"
          >
            {content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ContentArea;
