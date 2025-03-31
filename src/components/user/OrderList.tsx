
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { orders } from '@/services/mockData';
import { getUser } from '@/services/api';
import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderList = () => {
  const user = getUser();
  // Filter orders for the current user
  const userOrders = user ? orders.filter(order => order.userId === user.id) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View and manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        {userOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button asChild>
              <a href="/shop">Continue Shopping</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString();
              return (
                <div key={order.id} className="border rounded-md p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">Placed on {date}</p>
                    </div>
                    <div className="md:text-right mt-2 md:mt-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <p className="font-medium mb-1">Total: ₹{order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {order.products.length} item{order.products.length > 1 ? 's' : ''}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/order/${order.id}`}>
                          <Eye size={16} className="mr-1" />
                          View Details
                        </a>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download size={16} className="mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderList;
