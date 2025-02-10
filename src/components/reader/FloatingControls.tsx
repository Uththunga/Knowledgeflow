import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sun, Moon, Type, Palette } from "lucide-react";

interface FloatingControlsProps {
  onFontSizeChange?: (size: number) => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  fontSize?: number;
}

const FloatingControls = ({
  onFontSizeChange = () => {},
  onThemeToggle = () => {},
  isDarkMode = false,
  fontSize = 16,
}: FloatingControlsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed right-4 top-4 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg p-4 space-y-4 w-[280px] transition-all duration-200 hover:bg-background/90">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Reading Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Font Size Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span className="text-sm">Font Size</span>
            </div>
            <span className="text-sm text-muted-foreground">{fontSize}px</span>
          </div>
          <Slider
            defaultValue={[fontSize]}
            max={24}
            min={12}
            step={1}
            onValueChange={(value) => onFontSizeChange(value[0])}
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="text-sm">Theme</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onThemeToggle}
            className="h-8 w-8"
          >
            {isDarkMode ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingControls;
