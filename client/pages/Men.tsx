import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, Moon, Sun, Star, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import { db, Product } from "../lib/database";

export default function Men() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [] as string[],
    brands: [] as string[],
    priceRange: null as { min: number; max: number } | null,
    colors: [] as string[]
  });
  const { addToCart, addToWishlist, isInWishlist, getCartCount, wishlistItems } = useCart();
  const { isLoggedIn, requireAuth } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { name: "MEN", path: "/men", available: true },
    { name: "WOMEN", path: "/women", available: true },
    { name: "KIDS", path: "/kids", available: false }
  ];

  // Load products from database
  useEffect(() => {
    loadProducts();
  }, []);

  // Apply filters and sorting when they change
  useEffect(() => {
    applyFiltersAndSort();
  }, [products, selectedFilters, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const menProducts = await db.getProducts({ category: 'Men' });
      setProducts(menProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = async () => {
    try {
      let filtered = [...products];
      
      // Apply size filter
      if (selectedFilters.sizes.length > 0) {
        filtered = filtered.filter(product => 
          product.sizes.some(size => selectedFilters.sizes.includes(size))
        );
      }
      
      // Apply brand filter
      if (selectedFilters.brands.length > 0) {
        filtered = filtered.filter(product => 
          selectedFilters.brands.includes(product.brand)
        );
      }
      
      // Apply price filter
      if (selectedFilters.priceRange) {
        filtered = filtered.filter(product => 
          product.price >= selectedFilters.priceRange!.min && 
          product.price <= selectedFilters.priceRange!.max
        );
      }
      
      // Apply color filter
      if (selectedFilters.colors.length > 0) {
        filtered = filtered.filter(product => 
          product.colors.some(color => selectedFilters.colors.includes(color))
        );
      }
      
      // Apply sorting
      const sorted = await db.sortProducts(filtered, sortBy);
      setFilteredProducts(sorted);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const toggleFilter = (filterType: keyof typeof selectedFilters, value: string | { min: number; max: number }) => {
    setSelectedFilters(prev => {
      if (filterType === 'priceRange') {
        return {
          ...prev,
          priceRange: prev.priceRange?.min === (value as any).min ? null : value as { min: number; max: number }
        };
      } else {
        const currentValues = prev[filterType] as string[];
        const newValues = currentValues.includes(value as string)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value as string];
        return {
          ...prev,
          [filterType]: newValues
        };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      sizes: [],
      brands: [],
      priceRange: null,
      colors: []
    });
  };

  const filters = {
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
    { value: "popularity", label: "Popularity" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" }
  ];

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
                  } ${category.name === "MEN" ? "text-neon-blue" : ""}`}
                >
                  {category.name}
                  {!category.available && <span className="ml-1 text-xs">(Soon)</span>}
                </Link>
              ))}
              <SearchBar className="w-64" placeholder="Search men's products..." />
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/profile#wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
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
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    category.available 
                      ? "text-foreground hover:text-neon-blue" 
                      : "text-muted-foreground cursor-not-allowed"
                  } ${category.name === "MEN" ? "text-neon-blue" : ""}`}
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
          <span className="text-foreground">Men</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">MEN'S COLLECTION</h1>
            <p className="text-muted-foreground">Streetwear essentials for the modern Indian man</p>
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
              
              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.sizes.map(size => (
                    <Badge 
                      key={size} 
                      variant={selectedFilters.sizes.includes(size) ? "default" : "outline"} 
                      className={`cursor-pointer hover:bg-neon-blue hover:text-neon-foreground ${
                        selectedFilters.sizes.includes(size) ? 'bg-neon-blue text-neon-foreground' : ''
                      }`}
                      onClick={() => toggleFilter('sizes', size)}
                    >
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
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedFilters.priceRange?.min === range.min}
                        onChange={() => toggleFilter('priceRange', { min: range.min, max: range.max })}
                      />
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
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedFilters.brands.includes(brand)}
                        onChange={() => toggleFilter('brands', brand)}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.colors.map(color => (
                    <div 
                      key={color} 
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform ${
                        selectedFilters.colors.includes(color) ? 'border-neon-blue border-4' : 'border-border'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                      onClick={() => toggleFilter('colors', color)}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading products...</div>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
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

                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.colors.slice(0, 3).map(color => (
                            <div
                              key={color}
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: color.toLowerCase() }}
                              title={color}
                            ></div>
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                          )}
                        </div>

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
                                addToCart(product);
                                navigate('/checkout');
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
              </>
            )}
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8">
                Load More Products
              </Button>
            </div>
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
                ×
              </Button>
            </div>
            
            {/* Mobile filter content (same as desktop) */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.sizes.map(size => (
                    <Badge 
                      key={size} 
                      variant={selectedFilters.sizes.includes(size) ? "default" : "outline"} 
                      className={`cursor-pointer hover:bg-neon-blue hover:text-neon-foreground ${
                        selectedFilters.sizes.includes(size) ? 'bg-neon-blue text-neon-foreground' : ''
                      }`}
                      onClick={() => toggleFilter('sizes', size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Price</h4>
                <div className="space-y-2">
                  {filters.priceRanges.map(range => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedFilters.priceRange?.min === range.min}
                        onChange={() => toggleFilter('priceRange', { min: range.min, max: range.max })}
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-8">
              <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
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
