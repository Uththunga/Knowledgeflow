import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import ContentArea from "./reader/ContentArea";
import FloatingControls from "./reader/FloatingControls";
import AudioControls from "./reader/AudioControls";
import { BookOpen, FileText, Headphones, Radio } from "lucide-react";

interface HomeProps {
  initialContent?: string;
}

const Home = ({ initialContent = "" }: HomeProps) => {
  const [searchParams] = useSearchParams();
  const format = searchParams.get("format") || "ebook";

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
      <Tabs defaultValue={format} className="h-full">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4">
            <TabsList className="h-16 w-full justify-start gap-4">
              <TabsTrigger value="ebook" className="gap-2">
                <BookOpen className="h-4 w-4" />
                eBook
              </TabsTrigger>
              <TabsTrigger value="summary" className="gap-2">
                <FileText className="h-4 w-4" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="audiobook" className="gap-2">
                <Headphones className="h-4 w-4" />
                Audiobook
              </TabsTrigger>
              <TabsTrigger value="podcast" className="gap-2">
                <Radio className="h-4 w-4" />
                Podcast
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="pt-16">
          <TabsContent value="ebook" className="m-0">
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
          </TabsContent>

          <TabsContent value="summary" className="m-0">
            <div className="relative h-[calc(100vh-100px)]">
              <ContentArea
                content={"This is the summary content..."}
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
          </TabsContent>

          <TabsContent value="audiobook" className="m-0">
            <div className="relative h-[calc(100vh-100px)] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Headphones className="h-24 w-24 mx-auto text-muted-foreground" />
                <h2 className="text-2xl font-semibold">Audiobook Player</h2>
                <p className="text-muted-foreground">
                  Loading audio content...
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="podcast" className="m-0">
            <div className="relative h-[calc(100vh-100px)] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Radio className="h-24 w-24 mx-auto text-muted-foreground" />
                <h2 className="text-2xl font-semibold">Podcast Player</h2>
                <p className="text-muted-foreground">
                  Loading podcast content...
                </p>
              </div>
            </div>
          </TabsContent>
        </div>

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
      </Tabs>
    </div>
  );
};

export default Home;
