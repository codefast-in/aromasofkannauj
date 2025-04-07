import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminCategories from "./pages/AdminCategories";
import AdminSettings from "./pages/AdminSettings";
import UserProfile from "./pages/UserProfile";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import About from "./components/home/About";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Checkout from "./pages/Checkout";
import UserOrders from "./pages/Order";
import GiftingPage from "./pages/GiftingPage";
import BulkEnquiryPage from "./pages/BulkEnquiryPage";
import OurStoryPage from "./pages/OurStoryPage";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/gifting" element={<GiftingPage />} />
            <Route path="/bulk-enquiry" element={<BulkEnquiryPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
  
    </QueryClientProvider>
  </Provider>
);

export default App;