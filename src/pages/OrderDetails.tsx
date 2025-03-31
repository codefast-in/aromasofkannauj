
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orders, perfumes } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <Layout>
        <div className="container-custom py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button asChild>
            <a href="/profile">Return to Profile</a>
          </Button>
        </div>
      </Layout>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const orderItems = order.products.map(item => {
    const product = perfumes.find(p => p.id === item.productId);
    return { ...item, product };
  });

  return (
    <Layout>
      <div className="container-custom py-8">
        <Link to="/profile" className="flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to Profile
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">Placed on {orderDate}</p>
          </div>
          
          <Button variant="outline" className="mt-4 md:mt-0">
            <Download size={16} className="mr-2" />
            Download Invoice
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-start border-b last:border-0 pb-4 last:pb-0">
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0 mr-4">
                        <img 
                          src={item.product?.images[0] || '/placeholder.svg'} 
                          alt={item.product?.name || 'Product'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium">
                          {item.product?.name || 'Product Name'}
                        </h3>
                        <div className="flex flex-wrap text-sm text-muted-foreground">
                          <span className="mr-4">Quantity: {item.quantity}</span>
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{(order.totalAmount * 0.82).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{(order.totalAmount * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{(order.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Delivery Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {typeof order.shippingAddress === 'string' 
                        ? order.shippingAddress 
                        : `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Status</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                      order.status === 'delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Payment Method</h4>
                    <p className="text-sm text-muted-foreground">
                      Credit Card (ending in 4242)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
