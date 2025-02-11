import { useState } from "react";
import LibraryHeader from "@/components/library/LibraryHeader";
import BookGrid from "@/components/library/BookGrid";
import CategoryFilter, { Category } from "@/components/library/CategoryFilter";

const categories: Category[] = [
  {
    name: "Personal Development",
    subcategories: [
      "Habits and Self-Discipline",
      "Mindset and Motivation",
      "Resilience and Emotional Intelligence",
    ],
  },
  {
    name: "Wealth and Finance",
    subcategories: ["Personal Finance", "Investing and Economics"],
  },
  {
    name: "Business and Entrepreneurship",
    subcategories: [
      "Startups and Innovation",
      "Marketing and Sales",
      "Leadership and Management",
    ],
  },
  {
    name: "Communication and Relationships",
    subcategories: ["Interpersonal Skills"],
  },
  {
    name: "Productivity and Time Management",
    subcategories: ["Focus and Efficiency"],
  },
  {
    name: "Psychology and Cognitive Science",
    subcategories: [
      "Thinking and Decision-Making",
      "Emotional and Behavioral Psychology",
    ],
  },
  {
    name: "Emotional Well-Being",
    subcategories: ["Healing and Self-Care", "Spiritual Growth"],
  },
  {
    name: "Leadership and Strategic Thinking",
    subcategories: ["Leadership Principles", "Strategic and Critical Thinking"],
  },
  {
    name: "Health and Fitness",
    subcategories: ["Physical Health", "Endurance and Strength"],
  },
  {
    name: "Miscellaneous",
    subcategories: [
      "Biographies and Memoirs",
      "Literature and Writing",
      "Society and Culture",
    ],
  },
];

import { useNavigate } from "react-router-dom";

export default function LibraryPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleBookSelect = (
    bookId: string,
    format: "ebook" | "summary" | "audiobook" | "podcast",
  ) => {
    navigate(`/reader?id=${bookId}&format=${format}`);
  };

  const filteredBooks = (books: any[]) => {
    return books.filter((book) => {
      const matchesSearch = searchQuery
        ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? book.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <LibraryHeader
          view={view}
          onViewChange={setView}
          onSearch={setSearchQuery}
        />
        <div className="mt-8 grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div className="col-span-9">
            <BookGrid onBookSelect={handleBookSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
