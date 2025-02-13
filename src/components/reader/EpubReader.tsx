import React from "react";
import { ReactReader } from "react-reader";

interface EpubReaderProps {
  url?: string;
  fontSize?: number;

  onScroll?: (progress: number) => void;
}

const EpubReader = ({
  url = "https://s3.amazonaws.com/moby-dick/moby-dick.epub",
  fontSize = 16,

  onScroll = () => {},
}: EpubReaderProps) => {
  const readerStyles = {
    readerArea: {
      backgroundColor: "#fff",
      color: "#000",
      height: "100%",
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactReader
        url={url}
        locationChanged={(epubcifi: string) => {
          // Convert epubcifi location to percentage
          if (!epubcifi) return;
          const location = epubcifi.split("/");
          if (location.length >= 3) {
            const chapter = parseInt(location[0].replace(/(\(|\))/g, ""));
            const total = parseInt(location[2].split("[")[0]);
            const progress = (chapter / total) * 100;
            if (!isNaN(progress)) {
              onScroll(Math.min(Math.max(progress, 0), 100));
            }
          }
        }}
        epubOptions={{
          flow: "scrolled-doc",
          manager: "continuous",
          styles: {
            "*": {
              "font-size": `${fontSize}px !important`,
              "line-height": "1.6 !important",
            },
            p: {
              "font-size": `${fontSize}px !important`,
              margin: "1em 0 !important",
            },
            body: {
              padding: "20px !important",
              margin: "0 auto !important",
              "max-width": "800px !important",
            },
          },
        }}
        styles={readerStyles}
      />
    </div>
  );
};

export default EpubReader;
