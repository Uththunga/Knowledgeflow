import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface Category {
  name: string;
  subcategories: string[];
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)] w-full rounded-md border">
      <div className="p-4 space-y-4">
        <Button
          variant={!selectedCategory ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCategory("")}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <Button
              variant={
                selectedCategory === category.name ? "secondary" : "ghost"
              }
              className="w-full justify-start font-semibold"
              onClick={() => onSelectCategory(category.name)}
            >
              {category.name}
            </Button>
            {selectedCategory === category.name && (
              <div className="ml-4 space-y-1">
                {category.subcategories.map((sub) => (
                  <Button
                    key={sub}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm text-muted-foreground"
                    onClick={() => onSelectCategory(`${category.name}/${sub}`)}
                  >
                    {sub}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
