
// Mock data for development until backend is integrated
import im1  from "../assets/AND-EDP_GIFTSET_80ML_1_360x504.jpg"
import im2 from "../assets/AND-EDP_GIFTSET_80ML_2_360x504.jpg"
import im3 from "../assets/AND-EDP_GIFTSET_80ML_3_360x504.jpg"
import im4 from "../assets/AND-EDP_GIFTSET_80ML_4_360x504.jpg"
import im5 from "../assets/AND-EDP_GIFTSET_80ML_5_360x504.jpg"
import im6 from "../assets/AND-MIST_GIFTSET_200ML_1_360x504.jpg"
import im7 from "../assets/AND-MIST_GIFTSET_200ML_2_360x504.jpg"
import im8 from "../assets/AND-MIST_GIFTSET_200ML_3_360x504.jpg"
import im9 from "../assets/AND-MIST_GIFTSET_200ML_4_360x504.jpg"
import im10 from "../assets/AND-MIST_GIFTSET_200ML_5_360x504.jpg"
import im11 from "../assets/ARISTOCRAT_COASTAL_75ML_1_360x504.jpg"
import im12 from "../assets/ARISTOCRAT_COASTAL_75ML_2_360x504.jpg"
import im13 from "../assets/ARISTOCRAT_COASTAL_75ML_3_360x504.jpg"
import im14 from "../assets/ARISTOCRAT_COASTAL_75ML_4_360x504.jpg"
import im15 from "../assets/ARISTOCRAT_COASTAL_75ML_5_360x504.jpg"
import im16 from "../assets/ARISTOCRAT_CORAL_75ML_1_360x504.jpg"
import im17 from "../assets/ARISTOCRAT_CORAL_75ML_2_360x504.jpg"
import im18 from "../assets/ARISTOCRAT_CORAL_75ML_3_360x504.jpg"
import im19 from "../assets/ARISTOCRAT_CORAL_75ML_4_360x504.jpg"
import im20 from "../assets/ARISTOCRAT_CORAL_75ML_5_360x504.jpg"
import im21 from "../assets/AUTOGRAPH_EDP_100ML_1_360x504.jpg"
import im22 from "../assets/AUTOGRAPH_EDP_100ML_2_360x504.jpg"
import im23 from "../assets/AUTOGRAPH_EDP_100ML_3_360x504.jpg"
import im24 from "../assets/AUTOGRAPH_EDP_100ML_4_360x504.jpg"
import im25 from "../assets/AUTOGRAPH_EDP_100ML_5_360x504.jpg"
import im26 from "../assets/MUSK_SILK_SUPREME_50ML_1_360x504.jpg"
import im27 from "../assets/MUSK_SILK_SUPREME_50ML_2_360x504.jpg"
import im28 from "../assets/MUSK_SILK_SUPREME_50ML_3_360x504.jpg"
import im29 from "../assets/MUSK_SILK_SUPREME_50ML_4_360x504.jpg"
import im30 from "../assets/MUSK_SILK_SUPREME_50ML_5_360x504.jpg"
import im31 from "../assets/ROYAL-MISK-SAPPHIRE_CONCENTRATED_10ML_1_360x504.jpg"
import im32 from "../assets/ROYAL-MISK-SAPPHIRE_CONCENTRATED_10ML_2_eac076ed-7781-45e8-9e84-d1051ba133b3_360x504.jpg"
import im33 from "../assets/ROYAL-PEARL_CONCENTRATED_10ML_1_360x504.jpg"
import im34 from "../assets/ROYAL-PEARL_CONCENTRATED_10ML_2_588b5246-7062-4094-bf5a-a17a675deb05_360x504.jpg"
import im35 from "../assets/ROYAL-PEARL_CONCENTRATED_10ML_3_360x504.jpg"
import im36 from "../assets/ROYAL-PEARL_CONCENTRATED_10ML_4_360x504.jpg"
import im37 from "../assets/SHADOW_ICE_75ML_1_360x504.jpg"
import im38 from "../assets/SHADOW_ICE_75ML_2_360x504.jpg"
import im39 from "../assets/SHADOW_ICE_75ML_3_360x504.jpg"
import im40 from "../assets/SHADOW_ICE_75ML_4_360x504.jpg"
import im41 from "../assets/SHADOW_ICE_75ML_5_360x504.jpg"
export const perfumes = [
  {
    id: "1",
    name: "Royal Oud",
    description: "A sophisticated fragrance with notes of oud, sandalwood, and musk, perfect for evening occasions.",
    price: 120.00,
    images: [im1,im2,im3,im4,im5],
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
    images: [im6,im7,im8,im9,im10],
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
    images: [im11,im12,im13,im14,im15],
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
    images: [im16,im17,im18,im19,im20],
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
    images: [im21,im22,im23,im24,im25],
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
    images: [im26,im27,im28,im29,im30],
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
    images: [im31,im32],
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
    images: [im33,im34,im35,im36],
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
    images: [im37,im38,im39,im40,im41],
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

