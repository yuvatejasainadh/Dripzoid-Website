import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ placeholder = "Search for products...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
