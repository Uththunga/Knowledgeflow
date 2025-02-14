import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, Upload } from "lucide-react";
import UploadDialog from "@/components/upload/UploadDialog";
import { ContentFormat } from "@/components/home";

interface LibraryHeaderProps {
  view?: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
  onSearch?: (query: string) => void;
  onUpload?: (files: File[], format: ContentFormat, metadata: any) => void;
}

export default function LibraryHeader({
  view = "grid",
  onViewChange = () => {},
  onSearch = () => {},
  onUpload = () => {},
}: LibraryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-3xl font-bold tracking-tight">My Library</h1>
      <div className="flex items-center gap-4">
        <div className="relative flex-1 md:w-64 md:flex-none">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewChange("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <UploadDialog onUpload={onUpload} />
        </div>
      </div>
    </div>
  );
}
