import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, Moon, Sun, Plus, Minus, Trash2, ShoppingCart, Tag, MapPin, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [pincode, setPincode] = useState("");
  const { cartItems, updateQuantity, removeFromCart, getCartCount, getCartTotal } = useCart();
  const { isLoggedIn, user } = useAuth();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, [isLoggedIn]);

  // Don't render anything if not logged in
  if (!isLoggedIn) {
    return null;
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { name: "MEN", path: "/men", available: true },
    { name: "WOMEN", path: "/women", available: true },
    { name: "KIDS", path: "/kids", available: false }
  ];

  // Functions now come from cart context

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'dripzoid10') {
      alert('Coupon applied! 10% extra discount added.');
    } else if (couponCode.toLowerCase() === 'first500') {
      alert('Coupon applied! ₹500 off on first order.');
    } else {
      alert('Invalid coupon code. Try DRIPZOID10 or FIRST500');
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      alert(`Delivery available to ${pincode}. Free delivery on orders above ₹999!`);
    } else {
      alert('Please enter a valid 6-digit PIN code');
    }
  };

  const subtotal = getCartTotal();
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalSavings = originalTotal - subtotal;
  const deliveryCharge = subtotal >= 999 ? 0 : 99;
  const total = subtotal + deliveryCharge;

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
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-neon-blue text-neon-foreground text-xs">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
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
          <span className="text-foreground">Shopping Cart</span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some items to get started!</p>
            <Button asChild className="bg-neon-blue hover:bg-neon-blue/90">
              <Link to="/men">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <p className="text-muted-foreground">
                  {getCartCount()} items
                </p>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                          <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-end">
                        {/* Price */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                            {item.discount && (
                              <Badge className="bg-neon-blue text-neon-foreground text-xs">
                                {item.discount}% OFF
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Total: ₹{item.price * item.quantity}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/men">Continue Shopping</Link>
              </Button>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Coupon Code */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Apply Coupon
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg"
                  />
                  <Button onClick={applyCoupon}>Apply</Button>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Try: DRIPZOID10 or FIRST500
                </div>
              </div>

              {/* Delivery Check */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery
                </h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg"
                    maxLength={6}
                  />
                  <Button onClick={checkDelivery}>Check</Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free delivery on orders above ₹999</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Total Savings</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  {originalTotal > subtotal && (
                    <div className="text-xs text-muted-foreground">
                      You saved ₹{totalSavings} on this order!
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full mt-4 bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground text-lg py-6"
                  asChild
                >
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="border border-border rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-neon-blue" />
                    <span>100% Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-4 w-4 text-neon-blue" />
                    <span>Free Delivery on Orders ₹999+</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <RotateCcw className="h-4 w-4 text-neon-blue" />
                    <span>Easy 7-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
