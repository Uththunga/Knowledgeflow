// This component is deprecated - controls moved to top navigation
import React from "react";
import { Button } from "@/components/ui/button";

interface FloatingControlsProps {
  onFontSizeChange?: (size: number) => void;
  onThemeToggle?: () => void;
  fontSize?: number;
}

const FloatingControls = ({
  onFontSizeChange = () => {},
  onThemeToggle = () => {},
  fontSize = 16,
}: FloatingControlsProps) => {
  return null; // Component no longer used
};

export default FloatingControls;
