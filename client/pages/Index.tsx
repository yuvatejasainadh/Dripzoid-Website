import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, Moon, Sun, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { addToCart, addToWishlist, isInWishlist, getCartCount } = useCart();
  const { isLoggedIn, user, requireAuth } = useAuth();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Oversized Hoodie",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      category: "Men",
      rating: 4.5,
      discount: 33
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=400&fit=crop",
      category: "Women",
      rating: 4.8,
      discount: 29
    },
    {
      id: 3,
      name: "Cargo Pants",
      price: 1799,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
      category: "Men",
      rating: 4.3,
      discount: 22
    },
    {
      id: 4,
      name: "Graphic Tee",
      price: 799,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "Men",
      rating: 4.6,
      discount: 38
    }
  ];

  const categories = [
    { name: "MEN", path: "/men", available: true },
    { name: "WOMEN", path: "/women", available: true },
    { name: "KIDS", path: "/kids", available: false },
    { name: "ACCESSORIES", path: "/accessories", available: false }
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
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
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

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-brand-cream to-background">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <img
            src={isDarkMode
              ? "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fcedb9b0fffa847569c81aa40025b5357?format=webp&width=800"
              : "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fb536f9a54dea43a38ce36553002f4bc2?format=webp&width=800"
            }
            alt="DRIPZOID"
            className="h-32 md:h-48 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
            STYLE THAT POPS
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the latest streetwear trends designed for Indian youth. From oversized hoodies to statement pieces.
          </p>
          <Button 
            className="bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground text-lg px-8 py-6 h-auto font-semibold"
            asChild
          >
            <Link to="/men">SHOP NOW</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">CATEGORIES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`group relative overflow-hidden rounded-lg aspect-square ${
                  !category.available ? 'cursor-not-allowed' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className={`absolute inset-0 bg-neon-blue/20 transition-all duration-300 ${
                  category.available ? 'group-hover:bg-neon-blue/30' : ''
                }`}></div>
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white text-xl md:text-2xl font-bold">{category.name}</h3>
                  {!category.available && (
                    <p className="text-neon-blue text-sm font-medium">Coming Soon</p>
                  )}
                </div>
                {!category.available && (
                  <div className="absolute inset-0 bg-black/40 z-15 flex items-center justify-center">
                    <div className="bg-neon-blue text-neon-foreground px-4 py-2 rounded-full font-semibold">
                      COMING SOON
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending in India Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">TRENDING IN INDIA</h2>
          <p className="text-center text-muted-foreground mb-12">What Indian youth are loving right now</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (requireAuth()) {
                          addToWishlist(product);
                        }
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </Link>
                <div>
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
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
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
        </div>
      </section>

      {/* Budget Buys Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">BUDGET BUYS</h2>
          <p className="text-center text-muted-foreground mb-12">Style under ₹999</p>
          
          <div className="text-center">
            <Button 
              className="bg-neon-green hover:bg-neon-green/90 text-neon-foreground text-lg px-8 py-6 h-auto font-semibold"
              asChild
            >
              <Link to="/men?max_price=999">SHOP BUDGET BUYS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-dark text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">STAY IN THE LOOP</h2>
          <p className="text-lg mb-8">Get the latest drops and exclusive deals delivered to your inbox</p>
          
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg bg-white text-black"
            />
            <Button className="bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground px-6">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Also get updates on WhatsApp! Text "DRIPZOID" to +91 98765 43210
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src={isDarkMode
                  ? "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fcedb9b0fffa847569c81aa40025b5357?format=webp&width=800"
                  : "https://cdn.builder.io/api/v1/image/assets%2Fcb420c754f164cb09479ca8042848804%2Fb536f9a54dea43a38ce36553002f4bc2?format=webp&width=800"
                }
                alt="DRIPZOID"
                className="h-10 w-auto mb-4"
              />
              <p className="text-muted-foreground">
                India's favorite streetwear brand for Gen Z fashion lovers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link to="/press" className="hover:text-foreground">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link to="/returns" className="hover:text-foreground">Return Policy</Link></li>
                <li><Link to="/shipping" className="hover:text-foreground">Shipping Info</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
                <li><Link to="/refund" className="hover:text-foreground">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DRIPZOID. All rights reserved. Made in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
