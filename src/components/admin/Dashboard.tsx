
import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Package,
  AlertCircle
} from 'lucide-react';
import { orders, perfumes, users } from '@/services/mockData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard: React.FC = () => {
  // Calculate statistics
  const totalProducts = perfumes.length;
  const totalOrders = orders.length;
  const totalCustomers = users.filter(u => u.role === 'customer').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const lowStockProducts = perfumes.filter(p => p.stock < 15).length;
  
  // Cards data
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toFixed(2)}`,
      description: "Total sales revenue",
      icon: CreditCard,
      iconColor: "text-green-500",
      iconBg: "bg-green-100"
    },
    {
      title: "Orders",
      value: totalOrders,
      description: "Total orders placed",
      icon: ShoppingBag,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100"
    },
    {
      title: "Products",
      value: totalProducts,
      description: "Total products",
      icon: Package,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100"
    },
    {
      title: "Customers",
      value: totalCustomers,
      description: "Registered customers",
      icon: Users,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-100"
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      description: "Products to restock",
      icon: AlertCircle,
      iconColor: "text-red-500",
      iconBg: "bg-red-100"
    },
    {
      title: "Growth",
      value: "+24%",
      description: "Compared to last month",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-100"
    }
  ];
  
  // Recent orders
  const recentOrders = orders.slice(0, 5);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.iconBg} ${card.iconColor} p-2 rounded-full`}>
                <card.icon size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Recently placed customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Order ID</th>
                  <th className="text-left py-3 px-2">Customer</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Amount</th>
                  <th className="text-left py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const customer = users.find(u => u.id === order.userId);
                  const date = new Date(order.createdAt).toLocaleDateString();
                  
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">{order.id}</td>
                      <td className="py-3 px-2">{customer?.name || 'Unknown'}</td>
                      <td className="py-3 px-2">{date}</td>
                      <td className="py-3 px-2">₹{order.totalAmount.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
