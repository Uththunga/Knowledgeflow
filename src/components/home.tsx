import React, { useState } from "react";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import SidePanel from "./reader/SidePanel";
import ContentArea from "./reader/ContentArea";
import FloatingControls from "./reader/FloatingControls";
import AudioControls from "./reader/AudioControls";

interface HomeProps {
  initialContent?: string;
  initialChapters?: Array<{
    id: string;
    title: string;
    isActive: boolean;
  }>;
}

const Home = ({
  initialContent = "",
  initialChapters = [
    { id: "1", title: "Chapter 1: The Beginning", isActive: true },
    { id: "2", title: "Chapter 2: The Journey", isActive: false },
    { id: "3", title: "Chapter 3: The Climax", isActive: false },
  ],
}: HomeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark" : ""} bg-gradient-to-br from-background to-muted transition-all duration-200`}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
          <SidePanel chapters={initialChapters} />
        </ResizablePanel>

        <ResizablePanel defaultSize={80}>
          <div className="relative h-[calc(100vh-100px)]">
            <ContentArea
              content={initialContent}
              fontSize={fontSize}
              theme={isDarkMode ? "dark" : "light"}
            />
            <FloatingControls
              isDarkMode={isDarkMode}
              fontSize={fontSize}
              onThemeToggle={handleThemeToggle}
              onFontSizeChange={handleFontSizeChange}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <AudioControls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        currentTime={0}
        duration={300}
        volume={100}
        playbackSpeed={1}
      />
    </div>
  );
};

export default Home;
