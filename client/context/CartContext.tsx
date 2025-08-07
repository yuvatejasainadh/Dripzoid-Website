import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  discount?: number;
}

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: number;
  inStock: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const addToWishlist = (product: any) => {
    setWishlistItems((prev) => {
      const isAlreadyInWishlist = prev.some((item) => item.id === product.id);
      if (isAlreadyInWishlist) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, { ...product, inStock: true }];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
