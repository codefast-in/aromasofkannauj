
// Mock data for development until backend is integrated

export const perfumes = [
  {
    id: "1",
    name: "Royal Oud",
    description: "A sophisticated fragrance with notes of oud, sandalwood, and musk, perfect for evening occasions.",
    price: 120.00,
    images: ["/placeholder.svg"],
    category: "Men",
    type: "Eau de Parfum",
    notes: ["Woody", "Oriental", "Spicy"],
    sizes: [
      { size: "50ml", price: 120.00 },
      { size: "100ml", price: 200.00 }
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 24,
    featured: true
  },
  {
    id: "2",
    name: "Rose Elixir",
    description: "A delicate blend of Bulgarian roses with hints of vanilla and amber, creating a feminine and long-lasting scent.",
    price: 95.00,
    images: ["/placeholder.svg"],
    category: "Women",
    type: "Eau de Parfum",
    notes: ["Floral", "Oriental"],
    sizes: [
      { size: "30ml", price: 95.00 },
      { size: "50ml", price: 140.00 }
    ],
    stock: 20,
    rating: 4.5,
    reviewCount: 18,
    featured: true
  },
  {
    id: "3",
    name: "Citrus Ocean",
    description: "A refreshing unisex fragrance with vibrant notes of citrus, sea salt, and light musk, perfect for everyday wear.",
    price: 85.00,
    images: ["/placeholder.svg"],
    category: "Unisex",
    type: "Eau de Toilette",
    notes: ["Citrus", "Aquatic"],
    sizes: [
      { size: "50ml", price: 85.00 },
      { size: "100ml", price: 150.00 }
    ],
    stock: 30,
    rating: 4.2,
    reviewCount: 12,
    featured: false
  },
  {
    id: "4",
    name: "Amber Nights",
    description: "A warm and sensual fragrance with amber, vanilla, and exotic spices, ideal for romantic evenings.",
    price: 110.00,
    images: ["/placeholder.svg"],
    category: "Women",
    type: "Eau de Parfum",
    notes: ["Oriental", "Spicy", "Gourmand"],
    sizes: [
      { size: "50ml", price: 110.00 },
      { size: "100ml", price: 185.00 }
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 22,
    featured: true
  },
  {
    id: "5",
    name: "Vetiver Legend",
    description: "A sophisticated masculine scent with vetiver, cedarwood, and leather notes, providing a distinctive character.",
    price: 105.00,
    images: ["/placeholder.svg"],
    category: "Men",
    type: "Eau de Toilette",
    notes: ["Woody", "Green"],
    sizes: [
      { size: "50ml", price: 105.00 },
      { size: "100ml", price: 175.00 }
    ],
    stock: 25,
    rating: 4.6,
    reviewCount: 16,
    featured: false
  },
  {
    id: "6",
    name: "Jasmine Dream",
    description: "A luxurious floral fragrance centered around jasmine with supporting notes of rose and lily, a true floral delight.",
    price: 130.00,
    images: ["/placeholder.svg"],
    category: "Women",
    type: "Eau de Parfum",
    notes: ["Floral"],
    sizes: [
      { size: "50ml", price: 130.00 },
      { size: "100ml", price: 210.00 }
    ],
    stock: 12,
    rating: 4.7,
    reviewCount: 20,
    featured: true
  },
  {
    id: "7",
    name: "Midnight Saffron",
    description: "An exotic blend of saffron, oud, and vanilla, creating a mysterious and enchanting aura.",
    price: 150.00,
    images: ["/placeholder.svg"],
    category: "Unisex",
    type: "Perfume Oil",
    notes: ["Spicy", "Oriental"],
    sizes: [
      { size: "20ml", price: 150.00 },
      { size: "50ml", price: 290.00 }
    ],
    stock: 10,
    rating: 4.9,
    reviewCount: 14,
    featured: true
  },
  {
    id: "8",
    name: "Fresh Bergamot",
    description: "A light and refreshing scent featuring bergamot, lemon, and light musk, perfect for warm weather.",
    price: 80.00,
    images: ["/placeholder.svg"],
    category: "Unisex",
    type: "Eau de Cologne",
    notes: ["Citrus", "Green"],
    sizes: [
      { size: "100ml", price: 80.00 },
      { size: "200ml", price: 140.00 }
    ],
    stock: 35,
    rating: 4.3,
    reviewCount: 10,
    featured: false
  },
  // Adding new products
  {
    id: "9",
    name: "Vanilla Dreams",
    description: "A sweet and comforting fragrance with rich vanilla, caramel, and a hint of coconut.",
    price: 90.00,
    images: ["/placeholder.svg"],
    category: "Women",
    type: "Eau de Parfum",
    notes: ["Gourmand", "Oriental"],
    sizes: [
      { size: "50ml", price: 90.00 },
      { size: "100ml", price: 160.00 }
    ],
    stock: 22,
    rating: 4.7,
    reviewCount: 16,
    featured: false
  },
  {
    id: "10",
    name: "Cedar & Pine",
    description: "A rugged outdoor fragrance with notes of cedar, pine, and fresh mountain air.",
    price: 115.00,
    images: ["/placeholder.svg"],
    category: "Men",
    type: "Eau de Toilette",
    notes: ["Woody", "Green"],
    sizes: [
      { size: "50ml", price: 115.00 },
      { size: "100ml", price: 190.00 }
    ],
    stock: 18,
    rating: 4.4,
    reviewCount: 13,
    featured: false
  },
  {
    id: "11",
    name: "Mediterranean Breeze",
    description: "A bright and invigorating scent capturing the essence of coastal Mediterranean herbs and citrus.",
    price: 95.00,
    images: ["/placeholder.svg"],
    category: "Unisex",
    type: "Eau de Toilette",
    notes: ["Citrus", "Aquatic", "Green"],
    sizes: [
      { size: "50ml", price: 95.00 },
      { size: "100ml", price: 170.00 }
    ],
    stock: 24,
    rating: 4.5,
    reviewCount: 19,
    featured: true
  },
  {
    id: "12",
    name: "Lavender Fields",
    description: "A calming and elegant fragrance featuring French lavender, bergamot, and vanilla.",
    price: 88.00,
    images: ["/placeholder.svg"],
    category: "Women",
    type: "Eau de Parfum",
    notes: ["Floral", "Green"],
    sizes: [
      { size: "30ml", price: 88.00 },
      { size: "50ml", price: 140.00 }
    ],
    stock: 16,
    rating: 4.6,
    reviewCount: 15,
    featured: false
  }
];

export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real application, this would be hashed
    role: "admin",
    createdAt: "2023-01-01T10:00:00Z"
  },
  {
    id: "2",
    name: "Customer User",
    email: "customer@example.com",
    password: "customer123", // In a real application, this would be hashed
    role: "customer",
    createdAt: "2023-01-15T14:30:00Z"
  },
  // Adding new users
  {
    id: "3",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2023-02-10T09:20:00Z"
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2023-02-15T11:45:00Z"
  },
  {
    id: "5",
    name: "Amit Kumar",
    email: "amit@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2023-03-05T16:30:00Z"
  },
  {
    id: "6",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    password: "password123",
    role: "customer",
    createdAt: "2023-03-20T10:15:00Z"
  },
  {
    id: "7",
    name: "Vikram Singh",
    email: "vikram@example.com",
    password: "password123",
    role: "admin",
    createdAt: "2023-01-10T08:30:00Z"
  }
];

export const orders = [
  {
    id: "1",
    userId: "2",
    products: [
      { productId: "1", quantity: 1, size: "50ml", price: 120.00 },
      { productId: "3", quantity: 2, size: "50ml", price: 85.00 }
    ],
    totalAmount: 290.00,
    shippingAddress: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India"
    },
    paymentMethod: "COD",
    status: "delivered",
    createdAt: "2023-06-15T10:30:00Z"
  },
  {
    id: "2",
    userId: "2",
    products: [
      { productId: "4", quantity: 1, size: "100ml", price: 185.00 }
    ],
    totalAmount: 185.00,
    shippingAddress: {
      street: "456 Oak Lane",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India"
    },
    paymentMethod: "COD",
    status: "processing",
    createdAt: "2023-07-05T14:20:00Z"
  },
  // Adding new orders
  {
    id: "3",
    userId: "3",
    products: [
      { productId: "2", quantity: 1, size: "30ml", price: 95.00 },
      { productId: "6", quantity: 1, size: "50ml", price: 130.00 }
    ],
    totalAmount: 225.00,
    shippingAddress: {
      street: "789 Green Avenue",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India"
    },
    paymentMethod: "Credit Card",
    status: "delivered",
    createdAt: "2023-07-20T09:45:00Z"
  },
  {
    id: "4",
    userId: "4",
    products: [
      { productId: "7", quantity: 1, size: "20ml", price: 150.00 }
    ],
    totalAmount: 150.00,
    shippingAddress: {
      street: "321 River Road",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600001",
      country: "India"
    },
    paymentMethod: "UPI",
    status: "delivered",
    createdAt: "2023-08-10T16:15:00Z"
  },
  {
    id: "5",
    userId: "5",
    products: [
      { productId: "5", quantity: 1, size: "100ml", price: 175.00 },
      { productId: "8", quantity: 1, size: "100ml", price: 80.00 }
    ],
    totalAmount: 255.00,
    shippingAddress: {
      street: "567 Hill Street",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500001",
      country: "India"
    },
    paymentMethod: "COD",
    status: "processing",
    createdAt: "2023-09-05T11:30:00Z"
  }
];

export const coupons = [
  {
    id: "1",
    code: "WELCOME10",
    discountPercentage: 10,
    maxDiscount: 500,
    minPurchase: 1000,
    validFrom: "2023-01-01T00:00:00Z",
    validUntil: "2023-12-31T23:59:59Z",
    isActive: true
  },
  {
    id: "2",
    code: "SUMMER20",
    discountPercentage: 20,
    maxDiscount: 1000,
    minPurchase: 2000,
    validFrom: "2023-05-01T00:00:00Z",
    validUntil: "2023-08-31T23:59:59Z",
    isActive: true
  },
  // Adding new coupons
  {
    id: "3",
    code: "FESTIVE15",
    discountPercentage: 15,
    maxDiscount: 800,
    minPurchase: 1500,
    validFrom: "2023-10-01T00:00:00Z",
    validUntil: "2023-11-30T23:59:59Z",
    isActive: true
  },
  {
    id: "4",
    code: "NEWYEAR25",
    discountPercentage: 25,
    maxDiscount: 1200,
    minPurchase: 2500,
    validFrom: "2023-12-20T00:00:00Z",
    validUntil: "2024-01-10T23:59:59Z",
    isActive: false
  }
];

