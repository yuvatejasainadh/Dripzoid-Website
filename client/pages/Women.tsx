import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "../components/SearchBar";

export default function Women() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const categories = [
    { name: "MEN", path: "/men", available: true },
    { name: "WOMEN", path: "/women", available: true },
    { name: "KIDS", path: "/kids", available: false },
  ];

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={
                  isDarkMode
                    ? "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fcedb9b0fffa847569c81aa40025b5357?format=webp&width=800"
                    : "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fb536f9a54dea43a38ce36553002f4bc2?format=webp&width=800"
                }
                alt="DRIPZOID"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`text-sm font-medium transition-colors ${
                    category.available
                      ? "text-foreground hover:text-neon-blue"
                      : "text-muted-foreground cursor-not-allowed"
                  } ${category.name === "WOMEN" ? "text-neon-blue" : ""}`}
                >
                  {category.name}
                  {!category.available && (
                    <span className="ml-1 text-xs">(Soon)</span>
                  )}
                </Link>
              ))}
              <SearchBar
                className="w-64"
                placeholder="Search women's products..."
              />
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    category.available
                      ? "text-foreground hover:text-neon-blue"
                      : "text-muted-foreground cursor-not-allowed"
                  } ${category.name === "WOMEN" ? "text-neon-blue" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                  {!category.available && (
                    <span className="ml-1 text-xs">(Soon)</span>
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-6xl mb-8">👗</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            WOMEN'S COLLECTION
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're curating an amazing collection of streetwear pieces designed
            specifically for the modern Indian woman. Stay tuned!
          </p>

          <div className="bg-neon-blue/10 border border-neon-blue/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-neon-blue">
              Coming Soon!
            </h2>
            <p className="text-muted-foreground mb-4">
              Our women's collection is launching very soon with trendy hoodies,
              stylish tops, chic jackets, and more streetwear essentials.
            </p>
            <Button className="bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground">
              Notify Me When Available
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            In the meantime, check out our{" "}
            <Link to="/men" className="text-neon-blue hover:underline">
              Men's Collection
            </Link>{" "}
            for inspiration!
          </p>
        </div>
      </div>
    </div>
  );
}
