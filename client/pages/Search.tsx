import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, Moon, Sun, Star, Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState("relevance");
  const { addToCart, addToWishlist, isInWishlist, getCartCount, wishlistItems } = useCart();
  const { isLoggedIn, requireAuth } = useAuth();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { name: "MEN", path: "/men", available: true },
    { name: "WOMEN", path: "/women", available: true },
    { name: "KIDS", path: "/kids", available: false },
    { name: "ACCESSORIES", path: "/accessories", available: false }
  ];

  // Mock search results - in real app, this would come from API
  const searchResults = [
    {
      id: 1,
      name: "Oversized Drip Hoodie",
      brand: "DRIPZOID",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 128,
      discount: 33,
      category: "Men",
      tags: ["hoodie", "oversized", "streetwear"]
    },
    {
      id: 2,
      name: "Urban Graphic Hoodie",
      brand: "DRIPZOID",
      price: 1799,
      originalPrice: 2499,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 89,
      discount: 28,
      category: "Men",
      tags: ["hoodie", "graphic", "urban"]
    },
    {
      id: 3,
      name: "Premium Cotton Hoodie",
      brand: "DRIPZOID",
      price: 2199,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 203,
      discount: 27,
      category: "Men",
      tags: ["hoodie", "premium", "cotton"]
    },
    {
      id: 4,
      name: "Zip-Up Hoodie",
      brand: "DRIPZOID",
      price: 1899,
      originalPrice: 2599,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 156,
      discount: 27,
      category: "Men",
      tags: ["hoodie", "zip", "casual"]
    },
    {
      id: 5,
      name: "Cropped Hoodie",
      brand: "DRIPZOID",
      price: 1699,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 92,
      discount: 23,
      category: "Women",
      tags: ["hoodie", "cropped", "trendy"]
    },
    {
      id: 6,
      name: "Tie-Dye Hoodie",
      brand: "DRIPZOID",
      price: 1999,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 74,
      discount: 29,
      category: "Men",
      tags: ["hoodie", "tie-dye", "unique"]
    }
  ];

  const filters = {
    categories: ["Men", "Women", "Kids", "Accessories"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brands: ["DRIPZOID", "Urban", "Street", "Drip Co"],
    priceRanges: [
      { label: "Under ₹999", min: 0, max: 999 },
      { label: "₹1000 - ₹1999", min: 1000, max: 1999 },
      { label: "₹2000 - ₹2999", min: 2000, max: 2999 },
      { label: "Above ₹3000", min: 3000, max: 99999 }
    ],
    colors: ["Black", "White", "Gray", "Blue", "Red", "Green", "Navy", "Olive"]
  };

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "popularity", label: "Popularity" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      // Filter results based on search query
      filterResults();
    }
  };

  const filterResults = () => {
    // This is a simple filter - in a real app this would be an API call
    // For now, just update the search params which will trigger a re-render
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const currentQuery = searchParams.get('q') || '';
  const resultCount = searchResults.length;

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={isDarkMode
                  ? "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fcedb9b0fffa847569c81aa40025b5357?format=webp&width=800"
                  : "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fb536f9a54dea43a38ce36553002f4bc2?format=webp&width=800"
                }
                alt="DRIPZOID"
                className="h-12 w-auto"
              />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pr-10 border border-border rounded-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`text-sm font-medium transition-colors ${
                    category.available 
                      ? "text-foreground hover:text-neon-blue" 
                      : "text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {category.name}
                  {!category.available && <span className="ml-1 text-xs">(Soon)</span>}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-neon-blue text-neon-foreground text-xs">
                      {getCartCount()}
                    </Badge>
                  )}
                </Link>
              </Button>
              {isLoggedIn ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
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
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 pr-10 border border-border rounded-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    category.available 
                      ? "text-foreground hover:text-neon-blue" 
                      : "text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                  {!category.available && <span className="ml-1 text-xs">(Soon)</span>}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Search Results</span>
        </div>

        {/* Search Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {currentQuery ? `Search Results for "${currentQuery}"` : 'Search Results'}
            </h1>
            <p className="text-muted-foreground">
              {resultCount} product{resultCount !== 1 ? 's' : ''} found
              {currentQuery && ` for "${currentQuery}"`}
            </p>
          </div>
          
          {/* Sort and Filter */}
          <div className="flex items-center gap-4">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <Button 
              variant="outline" 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {filters.categories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.sizes.map(size => (
                    <Badge key={size} variant="outline" className="cursor-pointer hover:bg-neon-blue hover:text-neon-foreground">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price</h4>
                <div className="space-y-2">
                  {filters.priceRanges.map(range => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {filters.brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button variant="outline" className="w-full">
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Search Results Grid */}
          <main className="flex-1">
            {resultCount === 0 ? (
              /* No Results */
              <div className="text-center py-16">
                <Search className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-4">No results found</h2>
                <p className="text-muted-foreground mb-8">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Search suggestions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["hoodie", "jeans", "t-shirt", "sneakers", "jacket"].map(suggestion => (
                      <Badge 
                        key={suggestion} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-neon-blue hover:text-neon-foreground"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setSearchParams({ q: suggestion });
                        }}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {product.discount && (
                          <div className="absolute top-2 left-2 bg-neon-blue text-neon-foreground px-2 py-1 rounded text-sm font-semibold">
                            {product.discount}% OFF
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`absolute top-2 right-2 ${isDarkMode ? 'bg-black/80 hover:bg-black' : 'bg-white/80 hover:bg-white'}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (requireAuth()) {
                              addToWishlist(product);
                            }
                          }}
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : isDarkMode ? 'text-white' : 'text-black'}`} />
                        </Button>
                      </div>
                    </Link>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-neon-blue">{product.name}</h3>
                      </Link>

                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-neon-blue text-neon-blue'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({product.rating}) • {product.reviews} reviews
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                        )}
                      </div>

                      <Badge variant="outline" className="text-xs mb-3">
                        {product.category}
                      </Badge>

                      {/* Add to Cart and Buy Now buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            if (requireAuth()) {
                              addToCart(product);
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.preventDefault();
                            if (requireAuth()) {
                              window.location.href = '/checkout';
                            }
                          }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Load More */}
            {resultCount > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" className="px-8">
                  Load More Results
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile filter content (same as desktop) */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {filters.categories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.sizes.map(size => (
                    <Badge key={size} variant="outline" className="cursor-pointer hover:bg-neon-blue hover:text-neon-foreground">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-8">
              <Button variant="outline" className="flex-1" onClick={() => setIsFilterOpen(false)}>
                Clear All
              </Button>
              <Button className="flex-1 bg-neon-blue hover:bg-neon-blue/90" onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
