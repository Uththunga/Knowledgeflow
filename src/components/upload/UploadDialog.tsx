import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { googleDrive } from "@/lib/googleDrive";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, BookOpen, FileText, Headphones, Radio, X } from "lucide-react";
import { ContentFormat } from "@/components/home";

interface UploadDialogProps {
  onUpload?: (
    files: File[],
    format: ContentFormat,
    metadata: BookMetadata,
  ) => void;
}

interface BookMetadata {
  title: string;
  author: string;
  coverUrl?: string;
}

interface AudioFile {
  file: File;
  order: number;
}

export default function UploadDialog({
  onUpload = () => {},
}: UploadDialogProps) {
  const { toast } = useToast();
  const [formatData, setFormatData] = useState<
    Record<
      ContentFormat,
      {
        files: AudioFile[];
        metadata: BookMetadata;
      }
    >
  >(() => ({
    ebook: { files: [], metadata: { title: "", author: "" } },
    summary: { files: [], metadata: { title: "", author: "" } },
    audiobook: { files: [], metadata: { title: "", author: "" } },
    podcast: { files: [], metadata: { title: "", author: "" } },
  }));
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>("ebook");

  // Current format's data
  const currentData = formatData[selectedFormat];
  const selectedFiles = currentData.files;
  const metadata = currentData.metadata;

  const formatInfo = {
    ebook: {
      icon: BookOpen,
      label: "eBook",
      accept: ".epub",
      multiple: false,
    },
    summary: {
      icon: FileText,
      label: "Summary",
      accept: ".md,.txt",
      multiple: false,
    },
    audiobook: {
      icon: Headphones,
      label: "Audiobook",
      accept: ".mp3,.m4a,.wav",
      multiple: true,
    },
    podcast: {
      icon: Radio,
      label: "Podcast",
      accept: ".mp3,.m4a,.wav",
      multiple: false,
    },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedFormat === "audiobook") {
      // Sort files by name to maintain order
      const newFiles = files.map((file, index) => ({
        file,
        order: selectedFiles.length + index + 1,
      }));
      setFormatData((prev) => ({
        ...prev,
        [selectedFormat]: {
          ...prev[selectedFormat],
          files: [...prev[selectedFormat].files, ...newFiles],
        },
      }));
    } else if (files[0]) {
      setFormatData((prev) => ({
        ...prev,
        [selectedFormat]: {
          ...prev[selectedFormat],
          files: [{ file: files[0], order: 1 }],
        },
      }));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    // Reorder remaining files
    newFiles.forEach((file, i) => {
      file.order = i + 1;
    });
    setFormatData((prev) => ({
      ...prev,
      [selectedFormat]: {
        ...prev[selectedFormat],
        files: newFiles,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      try {
        // Sort files by order before uploading
        const sortedFiles = [...selectedFiles]
          .sort((a, b) => a.order - b.order)
          .map(({ file }) => file);

        // Upload cover image first if exists
        let coverUrl = undefined;
        if (coverFile) {
          coverUrl = await googleDrive.uploadFile(coverFile, {
            mimeType: coverFile.type,
          });
        }

        // Upload content files
        const contentUrls = await googleDrive.uploadContent(
          sortedFiles,
          selectedFormat,
          metadata,
        );

        onUpload(sortedFiles, selectedFormat, {
          ...metadata,
          coverUrl: coverUrl || coverPreview || undefined,
          contentUrls,
        });

        toast({
          title: "Upload successful",
          description: `${metadata.title} has been uploaded as ${formatInfo[selectedFormat].label}`,
        });
      } catch (error) {
        console.error("Upload failed:", error);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: error.message || "Please try again",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Upload className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={metadata.title}
              onChange={(e) =>
                setFormatData((prev) => ({
                  ...prev,
                  [selectedFormat]: {
                    ...prev[selectedFormat],
                    metadata: {
                      ...prev[selectedFormat].metadata,
                      title: e.target.value,
                    },
                  },
                }))
              }
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Step 2: Author */}
          <div className="space-y-2">
            <Label>Author</Label>
            <Input
              value={metadata.author}
              onChange={(e) =>
                setFormatData((prev) => ({
                  ...prev,
                  [selectedFormat]: {
                    ...prev[selectedFormat],
                    metadata: {
                      ...prev[selectedFormat].metadata,
                      author: e.target.value,
                    },
                  },
                }))
              }
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Step 3: Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image (Optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="mb-2"
            />
            {coverPreview && (
              <div className="relative aspect-[3/4] w-32 rounded-md overflow-hidden bg-muted">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Step 4: Format Selection */}
          <div className="space-y-2">
            <Label>Format</Label>
            <div className="grid grid-cols-2 gap-2">
              {(
                Object.entries(formatInfo) as [
                  ContentFormat,
                  (typeof formatInfo)[keyof typeof formatInfo],
                ][]
              ).map(([format, info]) => {
                const Icon = info.icon;
                return (
                  <Button
                    key={format}
                    type="button"
                    variant={selectedFormat === format ? "default" : "outline"}
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => {
                      setSelectedFormat(format);
                      setSelectedFiles([]);
                      // Also reset the file input
                      const fileInput = document.querySelector(
                        'input[type="file"]:not([accept="image/*"])',
                      ) as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                  >
                    <Icon className="h-8 w-8" />
                    <span>{info.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Content Files */}
          <div className="space-y-2">
            <Label>
              Content File{selectedFormat === "audiobook" ? "s" : ""}
            </Label>
            <Input
              type="file"
              accept={formatInfo[selectedFormat].accept}
              onChange={handleFileChange}
              multiple={formatInfo[selectedFormat].multiple}
              required={selectedFiles.length === 0}
            />

            {/* File List for Audiobooks */}
            {selectedFormat === "audiobook" && selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                {selectedFiles
                  .sort((a, b) => a.order - b.order)
                  .map((audioFile, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded-md"
                    >
                      <span className="text-sm truncate flex-1">
                        {audioFile.order.toString().padStart(2, "0")}.{" "}
                        {audioFile.file.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full mt-6" variant="default">
            Upload Content
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
