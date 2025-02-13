import React, { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ContentAreaProps {
  content?: string;
  fontSize?: number;

  onScroll?: (progress: number) => void;
}

const ContentArea = ({
  content = "",
  fontSize = 16,

  onScroll = () => {},
}: ContentAreaProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const scrollPosition = element.scrollTop;
    const maxScroll = element.scrollHeight - element.clientHeight;
    const progress = Math.min(
      Math.max((scrollPosition / maxScroll) * 100, 0),
      100,
    );

    // Only update if changed by more than 1%
    if (Math.abs(progress - lastScrollPosition) > 1) {
      setLastScrollPosition(progress);
      onScroll(progress);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full transition-colors duration-200",
        "bg-white text-black",
      )}
    >
      <ScrollArea
        className="h-full px-4 md:px-0"
        onScrollCapture={handleScroll}
      >
        <div ref={contentRef} className="max-w-2xl mx-auto py-8">
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1.6,
            }}
            className="prose dark:prose-invert max-w-none"
          >
            {content.split("\n").map((line, index) => {
              if (line.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-4xl font-bold mb-6">
                    {line.replace("# ", "")}
                  </h1>
                );
              } else if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                );
              } else if (line.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                );
              } else if (line.startsWith("- ")) {
                return (
                  <li key={index} className="ml-4 mb-2">
                    {line.replace("- ", "")}
                  </li>
                );
              } else if (line.trim() === "") {
                return <div key={index} className="h-4" />;
              } else {
                return (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContentArea;
