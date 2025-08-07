import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, Moon, Sun, Package, MapPin, CreditCard, Bell, LogOut, Star, Truck, RotateCcw, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Profile() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const { wishlistItems, addToCart, removeFromWishlist, getCartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, [isLoggedIn]);

  // Initialize edit form with user data
  useEffect(() => {
    if (user) {
      setEditedUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      });
    }
  }, [user]);

  // Don't render anything if not logged in
  if (!isLoggedIn || !user) {
    return null;
  }

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user
    alert('Profile updated successfully! (Demo mode - changes not persisted)');
    setIsEditing(false);
  };

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

  const orders = [
    {
      id: "DZ123456789",
      date: "2024-01-15",
      status: "delivered",
      total: 3998,
      items: [
        {
          name: "Oversized Drip Hoodie",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
          price: 1999,
          quantity: 2,
          size: "L",
          color: "Black"
        }
      ]
    },
    {
      id: "DZ987654321",
      date: "2024-01-10",
      status: "shipped",
      total: 1799,
      items: [
        {
          name: "Streetwear Cargo Pants",
          image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop",
          price: 1799,
          quantity: 1,
          size: "M",
          color: "Olive"
        }
      ]
    },
    {
      id: "DZ456789123",
      date: "2024-01-05",
      status: "processing",
      total: 2397,
      items: [
        {
          name: "Urban Graphic Tee",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
          price: 799,
          quantity: 3,
          size: "L",
          color: "White"
        }
      ]
    }
  ];


  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Arjun Kumar",
      address: "123, MG Road, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
      phone: "+91 9876543210",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      name: "Arjun Kumar",
      address: "456, Brigade Road, Richmond Town",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560025",
      phone: "+91 9876543210",
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "text-green-600 bg-green-50 border-green-200";
      case "shipped": return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing": return "text-orange-600 bg-orange-50 border-orange-200";
      case "cancelled": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <Package className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "processing": return <RotateCcw className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
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
              <Button variant="ghost" size="icon" className="text-neon-blue">
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
          <span className="text-foreground">My Account</span>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 p-6 border border-border rounded-lg">
          <div className="w-20 h-20 rounded-full bg-neon-blue/10 flex items-center justify-center">
            <User className="h-10 w-10 text-neon-blue" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground mb-2">{user.email}</p>
            <p className="text-muted-foreground">{user.phone}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <p className="text-muted-foreground">{orders.length} total orders</p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(order.status)} mb-2`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <p className="text-lg font-semibold">₹{order.total}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                    <Button variant="outline" size="sm">Track Order</Button>
                    <Button variant="outline" size="sm">Download Invoice</Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">Return/Exchange</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Wishlist</h2>
              <p className="text-muted-foreground">{wishlistItems.length} items</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="group border border-border rounded-lg overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-neon-blue text-neon-foreground px-2 py-1 rounded text-sm font-semibold">
                        {item.discount}% OFF
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating) 
                              ? 'fill-neon-blue text-neon-blue' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({item.rating})</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-neon-blue hover:bg-neon-blue/90"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item)}
                      >
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <Button className="bg-neon-blue hover:bg-neon-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className="border border-border rounded-lg p-6 relative">
                  {address.isDefault && (
                    <Badge className="absolute top-4 right-4 bg-neon-blue text-neon-foreground">
                      Default
                    </Badge>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      {address.type}
                    </h3>
                    <p className="font-medium">{address.name}</p>
                    <p className="text-muted-foreground">{address.address}</p>
                    <p className="text-muted-foreground">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="text-muted-foreground">{address.phone}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                    {!address.isDefault && (
                      <Button variant="outline" size="sm">Set as Default</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={isEditing ? editedUser.firstName : user.firstName}
                      onChange={(e) => isEditing && setEditedUser(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={isEditing ? editedUser.lastName : user.lastName}
                      onChange={(e) => isEditing && setEditedUser(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={isEditing ? editedUser.email : user.email}
                      onChange={(e) => isEditing && setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={isEditing ? editedUser.phone : user.phone}
                      onChange={(e) => isEditing && setEditedUser(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      className="bg-neon-blue hover:bg-neon-blue/90"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset edited data to original user data
                        setEditedUser({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email,
                          phone: user.phone
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Order updates via SMS</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Order updates via Email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>New arrivals and sale notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span>WhatsApp notifications</span>
                  </label>
                </div>
              </div>

              {/* Security */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Security</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                </div>
              </div>

              {/* Logout */}
              <div className="border border-border rounded-lg p-6">
                <Button variant="destructive" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
