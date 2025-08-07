import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, Moon, Sun, MapPin, CreditCard, Smartphone, Building, Banknote, Shield, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: ""
  });

  const [paymentData, setPaymentData] = useState({
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: ""
  });

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

  const orderItems = [
    {
      id: 1,
      name: "Oversized Drip Hoodie",
      brand: "DRIPZOID",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      size: "L",
      color: "Black",
      quantity: 2
    },
    {
      id: 2,
      name: "Streetwear Cargo Pants",
      brand: "DRIPZOID",
      price: 1799,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop",
      size: "M",
      color: "Olive",
      quantity: 1
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = orderItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const totalSavings = originalTotal - subtotal;
  const deliveryCharge = 0; // Free delivery
  const total = subtotal + deliveryCharge;

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
  ];

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Pay with Google Pay, PhonePe, Paytm",
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, RuPay"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building className="h-5 w-5" />,
      description: "All major banks supported"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <Banknote className="h-5 w-5" />,
      description: "Pay when you receive"
    }
  ];

  const placeOrder = () => {
    // Basic validation
    if (!formData.firstName || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill in all required fields");
      return;
    }

    if (selectedPayment === "upi" && !paymentData.upiId) {
      alert("Please enter your UPI ID");
      return;
    }

    if (selectedPayment === "card" && (!paymentData.cardNumber || !paymentData.cardExpiry || !paymentData.cardCvv)) {
      alert("Please fill in all card details");
      return;
    }

    // Simulate order placement
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="https://cdn.builder.io/api/v1/assets/cb420c754f164cb09479ca8042848804/1754575128006-fef9ca?format=webp&width=800" 
                  alt="DRIPZOID" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* Order Success */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-md mx-auto">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for shopping with DRIPZOID. Your order #DZ{Math.random().toString(36).substr(2, 9).toUpperCase()} has been confirmed.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-green-800 dark:text-green-400">
                Expected delivery: 3-5 business days
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                We'll send updates to {formData.phone}
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-neon-blue hover:bg-neon-blue/90">
                <Link to="/profile">Track Your Order</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/men">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://cdn.builder.io/api/v1/assets/cb420c754f164cb09479ca8042848804/1754575128006-fef9ca?format=webp&width=800" 
                alt="DRIPZOID" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Secure Checkout Badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-foreground">Cart</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold">Checkout</h1>

            {/* Delivery Address */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFormChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="Enter first name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFormChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="Enter last name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleFormChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    rows={3}
                    placeholder="House/Flat number, Building name, Street, Area"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleFormChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleFormChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">PIN Code *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleFormChange('pincode', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="6-digit PIN code"
                    maxLength={6}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => handleFormChange('landmark', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    placeholder="Near landmark"
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h2>
              
              <div className="space-y-3 mb-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPayment === method.id 
                        ? 'border-neon-blue bg-neon-blue/5' 
                        : 'border-border hover:border-neon-blue/50'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="text-neon-blue"
                      />
                      {method.icon}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          {method.popular && (
                            <Badge className="bg-neon-blue text-neon-foreground text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Details */}
              {selectedPayment === "upi" && (
                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">UPI ID *</label>
                    <input
                      type="text"
                      value={paymentData.upiId}
                      onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      placeholder="yourname@paytm / yourname@gpay"
                    />
                  </div>
                </div>
              )}

              {selectedPayment === "card" && (
                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentData.cardExpiry}
                        onChange={(e) => handlePaymentChange('cardExpiry', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV *</label>
                      <input
                        type="text"
                        value={paymentData.cardCvv}
                        onChange={(e) => handlePaymentChange('cardCvv', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      value={paymentData.cardName}
                      onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      placeholder="Name on card"
                    />
                  </div>
                </div>
              )}

              {selectedPayment === "netbanking" && (
                <div className="space-y-4 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to your bank's website to complete the payment.
                  </p>
                </div>
              )}

              {selectedPayment === "cod" && (
                <div className="space-y-4 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    Pay ₹{total} when your order is delivered. Cash on delivery is available for orders up to ₹50,000.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border border-border rounded-lg p-4">
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
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button 
                onClick={placeOrder}
                className="w-full mt-4 bg-neon-blue hover:bg-neon-blue/90 text-neon-foreground text-lg py-6"
              >
                Place Order - ₹{total}
              </Button>
            </div>

            {/* Security Info */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-neon-blue" />
                <span className="font-semibold">Secure Payment</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your payment information is encrypted and secure. We never store your payment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
