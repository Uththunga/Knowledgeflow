import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, Clock } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  progress: number;
  lastRead?: string;
}

interface BookGridProps {
  books?: Book[];
  onBookSelect?: (bookId: string) => void;
}

export default function BookGrid({
  books = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
      progress: 45,
      lastRead: "2 days ago",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverUrl:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop",
      progress: 78,
      lastRead: "Yesterday",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      coverUrl:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop",
      progress: 12,
      lastRead: "3 days ago",
    },
  ],
  onBookSelect = () => {},
}: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <Card
          key={book.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-200"
        >
          <CardHeader className="p-0">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-background/0 p-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Clock className="h-4 w-4" />
                  <span>{book.lastRead}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="line-clamp-1">{book.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {book.progress}%
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 gap-2">
            <Button
              variant="default"
              className="flex-1 gap-2"
              onClick={() => onBookSelect(book.id)}
            >
              <BookOpen className="h-4 w-4" />
              Continue
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
