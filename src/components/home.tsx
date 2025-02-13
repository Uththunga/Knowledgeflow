import React, { useState } from "react";
import ContentArea from "./reader/ContentArea";
import EpubReader from "./reader/EpubReader";
import AudioControls from "./reader/AudioControls";
import { Button } from "@/components/ui/button";

import { BookOpen, FileText, Headphones, Radio } from "lucide-react";
import { sampleSummaryContent } from "@/data/sampleContent";
import { useSearchParams } from "react-router-dom";

interface HomeProps {
  initialContent?: string;
}

const FORMATS = [
  { id: "ebook", label: "eBook", icon: BookOpen },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "audiobook", label: "Audiobook", icon: Headphones },
  { id: "podcast", label: "Podcast", icon: Radio },
] as const;

export type ContentFormat = (typeof FORMATS)[number]["id"];

const Home = ({ initialContent = "" }: HomeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const format = searchParams.get("format") || "ebook";

  const [fontSize, setFontSize] = useState(16);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleScroll = (progress: number) => {
    setProgress(progress);
  };

  const handleFormatChange = (newFormat: string) => {
    setSearchParams({ format: newFormat });
  };

  const currentFormat = FORMATS.find((f) => f.id === format) || FORMATS[0];

  const renderContent = () => {
    switch (format) {
      case "audiobook":
      case "podcast":
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <currentFormat.icon className="h-24 w-24 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-semibold">
                {currentFormat.label} Player
              </h2>
              <p className="text-muted-foreground">
                Loading {format} content...
              </p>
            </div>
          </div>
        );
      default:
        return format === "ebook" ? (
          <EpubReader fontSize={fontSize} onScroll={handleScroll} />
        ) : (
          <ContentArea
            content={
              format === "summary" ? sampleSummaryContent : initialContent
            }
            fontSize={fontSize}
            onScroll={handleScroll}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted transition-all duration-200">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {FORMATS.map((f) => {
                const Icon = f.icon;
                return (
                  <Button
                    key={f.id}
                    variant={format === f.id ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                    onClick={() => handleFormatChange(f.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{f.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-2">
                <div className="w-[100px] h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium min-w-[3ch]">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <div className="relative h-[calc(100vh-64px)]">{renderContent()}</div>
      </div>

      {/* Audio Controls */}
      {(format === "audiobook" || format === "podcast") && (
        <AudioControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          currentTime={0}
          duration={300}
          volume={100}
          playbackSpeed={1}
        />
      )}
    </div>
  );
};

export default Home;
