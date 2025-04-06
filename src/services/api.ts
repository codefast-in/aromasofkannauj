import {STORAGE_KEYS, API_URL} from "@/config/constants";
import {match} from "assert";
import axios from "axios";

// Storage utils
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getUser = (): any => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

export const setUser = (user: any): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUser();
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === "admin";
};

// Axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      removeUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {email, password});

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  register: async (userData: any) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    removeToken();
    removeUser();
  },
};




// Enhanced product API with pagination and filtering
export const productAPI = {
  getAll: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      notes?: string;
      types?: string;
      minPrice?: number;
      maxPrice?: number;
      sort?: string;
      featured?: boolean;
    } = {}
  ) => {
    try {
  
      const response = await api.get("product/getAll", {params});
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/product/get/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (productData: any) => {
    console.log(productData);
    
    try {
      const response = await api.post("/product/create", productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, productData: any) => {
    try {
      const response = await api.put(`/product/update/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/product/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const orderAPI = {
  getAll: async (filters = {},token:string) => {
    try {
      console.log(token)

      if(!token) return
      const response = await api.get("order/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (orderData: any) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, orderData: any) => {
    try {
      const response = await api.put(`/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const userAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/users", {params});
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, userData: any) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const uploadAPI = {
  uploadImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const coponAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/coupon/getAll");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (couponData: any) => {
    try {
      const response = await api.post("/coupon/create", couponData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  match: async (code: string) => {
    try {
      const response = await api.get(`/coupon/match/${code}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default api;
