import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, Moon, Sun, Star, Plus, Minus, Truck, Shield, RotateCcw, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetails() {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { name: "MEN", path: "/men", available: true },
    { name: "WOMEN", path: "/women", available: true },
    { name: "KIDS", path: "/kids", available: false }
  ];

  // Mock product data (in real app, this would come from API/props)
  const product = {
    id: 1,
    name: "Oversized Drip Hoodie",
    brand: "DRIPZOID",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.5,
    reviews: 128,
    description: "Elevate your streetwear game with our signature oversized hoodie. Crafted from premium cotton blend with a soft fleece interior, this hoodie offers unmatched comfort and style. Perfect for Indian weather with breathable fabric.",
    features: [
      "Premium 80% Cotton, 20% Polyester blend",
      "Soft fleece interior lining",
      "Kangaroo pocket with hidden phone compartment",
      "Adjustable drawstring hood",
      "Ribbed cuffs and hem",
      "Pre-shrunk fabric",
      "Machine washable"
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=600&h=600&fit=crop"
    ],
    sizes: [
      { size: "S", chest: "36-38", available: true },
      { size: "M", chest: "38-40", available: true },
      { size: "L", chest: "40-42", available: true },
      { size: "XL", chest: "42-44", available: true },
      { size: "XXL", chest: "44-46", available: false }
    ],
    colors: [
      { name: "Black", hex: "#000000", available: true },
      { name: "White", hex: "#FFFFFF", available: true },
      { name: "Gray", hex: "#808080", available: true },
      { name: "Navy", hex: "#000080", available: false }
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Arjun K.",
      rating: 5,
      date: "2 days ago",
      comment: "Amazing quality! The fit is perfect and the material feels premium. Worth every rupee.",
      verified: true,
      size: "L",
      color: "Black"
    },
    {
      id: 2,
      user: "Priya S.",
      rating: 4,
      date: "1 week ago",
      comment: "Love the oversized fit. Very comfortable for casual wear. Only wish more colors were available.",
      verified: true,
      size: "M",
      color: "White"
    },
    {
      id: 3,
      user: "Rohit M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Best hoodie I've bought online. Fast delivery to Mumbai. Definitely ordering more from DRIPZOID!",
      verified: true,
      size: "XL",
      color: "Gray"
    }
  ];

  const similarProducts = [
    {
      id: 2,
      name: "Streetwear Cargo Pants",
      price: 1799,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop",
      rating: 4.3
    },
    {
      id: 3,
      name: "Urban Graphic Tee",
      price: 799,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      rating: 4.6
    },
    {
      id: 4,
      name: "Denim Bomber Jacket",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=300&fit=crop",
      rating: 4.8
    }
  ];

  const checkPincode = () => {
    if (pincode.length === 6) {
      // Mock pincode check
      alert(`Delivery available to ${pincode}. Expected delivery: 3-5 days`);
    } else {
      alert("Please enter a valid 6-digit PIN code");
    }
  };

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
          <Link to="/men" className="hover:text-foreground">Men</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-neon-blue text-neon-foreground px-3 py-1 rounded text-sm font-semibold">
                  {product.discount}% OFF
                </div>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-neon-blue' : 'border-border'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
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
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <Badge className="bg-neon-blue text-neon-foreground">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {product.sizes.map((sizeOption) => (
                  <Button
                    key={sizeOption.size}
                    variant={selectedSize === sizeOption.size ? "default" : "outline"}
                    className={`${selectedSize === sizeOption.size ? 'bg-neon-blue hover:bg-neon-blue/90' : ''} ${
                      !sizeOption.available ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
                    disabled={!sizeOption.available}
                  >
                    {sizeOption.size}
                  </Button>
                ))}
              </div>
              <Button variant="link" className="text-sm p-0 h-auto">
                Size Chart
              </Button>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => colorOption.available && setSelectedColor(colorOption.name)}
                    disabled={!colorOption.available}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === colorOption.name 
                        ? 'border-neon-blue scale-110' 
                        : 'border-border'
                    } ${!colorOption.available ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    style={{ backgroundColor: colorOption.hex }}
                    title={colorOption.name}
                  >
                    {!colorOption.available && (
                      <div className="w-full h-full rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-500 text-xs">✕</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground text-lg py-6"
                disabled={!selectedSize || !selectedColor}
              >
                Add to Cart - ₹{product.price * quantity}
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-lg py-6"
                disabled={!selectedSize || !selectedColor}
              >
                Buy Now
              </Button>
            </div>

            {/* Delivery Check */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Check Delivery
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg"
                  maxLength={6}
                />
                <Button onClick={checkPincode}>Check</Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-neon-blue" />
                <p className="text-sm">Free Delivery</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-neon-blue" />
                <p className="text-sm">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-neon-blue" />
                <p className="text-sm">1 Year Warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-neon-blue mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.user}</span>
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? 'fill-neon-blue text-neon-blue' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground mb-2">{review.comment}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Size: {review.size}</span>
                  <span>Color: {review.color}</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Similar Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
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
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
