import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AudioControlsProps {
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  playbackSpeed?: number;
  onPlayPause?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onVolumeChange?: (value: number[]) => void;
  onProgressChange?: (value: number[]) => void;
  onSpeedChange?: (value: string) => void;
}

const AudioControls = ({
  isPlaying = false,
  currentTime = 0,
  duration = 300, // 5 minutes default
  volume = 100,
  playbackSpeed = 1,
  onPlayPause = () => {},
  onSkipBack = () => {},
  onSkipForward = () => {},
  onVolumeChange = () => {},
  onProgressChange = () => {},
  onSpeedChange = () => {},
}: AudioControlsProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border p-4 shadow-lg transition-all duration-200">
      <div className="max-w-7xl mx-auto space-y-2">
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={onProgressChange}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              {/* Volume control */}
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onVolumeChange([volume === 0 ? 100 : 0])}
                    >
                      {volume === 0 ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Volume</TooltipContent>
                </Tooltip>
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={onVolumeChange}
                  className="w-24"
                />
              </div>

              {/* Playback controls */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onSkipBack}>
                    <SkipBack className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Skip back 15s</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onPlayPause}>
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onSkipForward}>
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Skip forward 15s</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Playback speed */}
          <Select
            value={playbackSpeed.toString()}
            onValueChange={onSpeedChange}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
