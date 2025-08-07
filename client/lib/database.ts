// SQLite Database utility for DRIPZOID e-commerce
// This is a mock implementation since we're in a browser environment
// In a real app, this would connect to a server-side SQLite database

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  discount?: number;
  sizes: string[];
  colors: string[];
  category: string;
  description?: string;
  inStock: boolean;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
}

export interface Order {
  id: number;
  userId: number;
  items: Array<{
    productId: number;
    quantity: number;
    size: string;
    color: string;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Mock database using localStorage for browser storage
class MockSQLiteDB {
  private getTable<T>(tableName: string): T[] {
    const data = localStorage.getItem(`dripzoid_${tableName}`);
    return data ? JSON.parse(data) : [];
  }

  private setTable<T>(tableName: string, data: T[]): void {
    localStorage.setItem(`dripzoid_${tableName}`, JSON.stringify(data));
  }

  // Products CRUD operations
  async getProducts(filters?: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    sizes?: string[];
    colors?: string[];
    brands?: string[];
    search?: string;
  }): Promise<Product[]> {
    let products = this.getTable<Product>('products');
    
    // Initialize with mock data if empty
    if (products.length === 0) {
      products = this.initializeMockProducts();
      this.setTable('products', products);
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        products = products.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
      }
      if (filters.priceMin !== undefined) {
        products = products.filter(p => p.price >= filters.priceMin!);
      }
      if (filters.priceMax !== undefined) {
        products = products.filter(p => p.price <= filters.priceMax!);
      }
      if (filters.sizes && filters.sizes.length > 0) {
        products = products.filter(p => p.sizes.some(size => filters.sizes!.includes(size)));
      }
      if (filters.colors && filters.colors.length > 0) {
        products = products.filter(p => p.colors.some(color => filters.colors!.includes(color)));
      }
      if (filters.brands && filters.brands.length > 0) {
        products = products.filter(p => filters.brands!.includes(p.brand));
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.description?.toLowerCase().includes(searchTerm)
        );
      }
    }

    return products;
  }

  async sortProducts(products: Product[], sortBy: string): Promise<Product[]> {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popularity':
      default:
        return sorted.sort((a, b) => b.reviews - a.reviews);
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  // Users CRUD operations
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = this.getTable<User>('users');
    const newUser: User = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.setTable('users', users);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = this.getTable<User>('users');
    return users.find(u => u.email === email) || null;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const users = this.getTable<User>('users');
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...userData };
    this.setTable('users', users);
    return users[userIndex];
  }

  // Orders CRUD operations
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const orders = this.getTable<Order>('orders');
    const newOrder: Order = {
      ...orderData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    this.setTable('orders', orders);
    return newOrder;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const orders = this.getTable<Order>('orders');
    return orders.filter(o => o.userId === userId);
  }

  private initializeMockProducts(): Product[] {
    return [
      {
        id: 1,
        name: "Oversized Drip Hoodie",
        price: 1999,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.5,
        reviews: 128,
        discount: 33,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Gray"],
        category: "Men",
        description: "Premium oversized hoodie with street-inspired design",
        inStock: true,
        createdAt: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        name: "Streetwear Cargo Pants",
        price: 1799,
        originalPrice: 2299,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.3,
        reviews: 89,
        discount: 22,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Olive", "Black", "Navy"],
        category: "Men",
        description: "Multi-pocket cargo pants for urban style",
        inStock: true,
        createdAt: "2024-01-20T10:00:00Z"
      },
      {
        id: 3,
        name: "Urban Graphic Tee",
        price: 799,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.6,
        reviews: 203,
        discount: 38,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Red"],
        category: "Men",
        description: "Stylish graphic tee with urban artwork",
        inStock: true,
        createdAt: "2024-01-10T10:00:00Z"
      },
      {
        id: 4,
        name: "Denim Bomber Jacket",
        price: 2499,
        originalPrice: 3499,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.8,
        reviews: 67,
        discount: 29,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black"],
        category: "Men",
        description: "Classic denim bomber with modern streetwear aesthetic",
        inStock: true,
        createdAt: "2024-01-25T10:00:00Z"
      },
      {
        id: 5,
        name: "Sweat Shorts",
        price: 899,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.2,
        reviews: 156,
        discount: 25,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Gray", "Navy"],
        category: "Men",
        description: "Comfortable sweat shorts for casual wear",
        inStock: true,
        createdAt: "2024-01-05T10:00:00Z"
      },
      {
        id: 6,
        name: "Oversized Tank Top",
        price: 699,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.4,
        reviews: 92,
        discount: 30,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Black", "Gray"],
        category: "Men",
        description: "Relaxed fit tank top for summer streetwear",
        inStock: true,
        createdAt: "2024-01-30T10:00:00Z"
      },
      {
        id: 7,
        name: "Crop Top Hoodie",
        price: 1599,
        originalPrice: 2199,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.7,
        reviews: 145,
        discount: 27,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Pink", "Black", "White", "Purple"],
        category: "Women",
        description: "Trendy crop hoodie for the fashion-forward",
        inStock: true,
        createdAt: "2024-01-18T10:00:00Z"
      },
      {
        id: 8,
        name: "High-Waist Joggers",
        price: 1299,
        originalPrice: 1799,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
        brand: "DRIPZOID",
        rating: 4.5,
        reviews: 98,
        discount: 28,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Gray", "Beige"],
        category: "Women",
        description: "Comfortable high-waist joggers with streetwear style",
        inStock: true,
        createdAt: "2024-01-22T10:00:00Z"
      }
    ];
  }
}

// Export singleton instance
export const db = new MockSQLiteDB();
