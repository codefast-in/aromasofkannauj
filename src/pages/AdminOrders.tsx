import React, {useEffect, useState} from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {orders, users} from "@/services/mockData";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search, Eye} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {getToken, orderAPI, userAPI} from "@/services/api";
import {getAllOrder} from "@/services/order"


const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [safeOrders, setSafeOrders] = useState<any>([]);
  const [safeUsers, setSafeUsers] = useState<any>([]);
  // Add safety checks
        const token = getToken(); // Ensure you have a function to retrieve the token

console.log(token)
useEffect(() => {
  const fetchData = async () => {
    if (!token) return;

    try {
      const fetchAllOrders = getAllOrder();
      const response = await fetchAllOrders(token); // assuming response is an array

      const transformedOrders = response.map((order: any) => {
        return {
          id: order.order_id,
          userDetilas: order.user,
          createdAt: order.createdAt,
          totalAmount: parseFloat(order.totalPrice),
          status: order.orderStatus,
          shippingAddress: order.shippingInfo
          ? ` ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`
          : '',
        
          products: order.orderItems.map((item: any) => ({
            name: item.product?.name || "Unnamed Product",
            price: item.product?.price || 0,
            quantity: item.quantity || 1,
          })),
        };
      });

      setSafeOrders(transformedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchData();
}, [token]);


  // Filter orders based on search and status
  const filteredOrders = safeOrders.filter((order: any) => {
    const search = searchTerm.toLowerCase();
  
    const matchesOrderId = order?.id?.toLowerCase().includes(search);
    const matchesCustomer = order?.userDetilas?.name
      ?.toLowerCase()
      .includes(search);
    const matchesEmail = order?.userDetilas?.email
      ?.toLowerCase()
      .includes(search);
  
    const matchesSearch = matchesOrderId || matchesCustomer || matchesEmail;
  
    const matchesStatus =
      !statusFilter || statusFilter === "all" || order?.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });
  

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCustomerName = (userId: string) => {
    if (!userId) return "Unknown Customer";
    const user = safeUsers.find((u) => u.id === userId);
    return user ? user.name : "Unknown Customer";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Orders</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search by order ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order?.userDetilas?.name}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewOrderDetails(order)}>
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog - Add safety checks */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details: #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder?.userDetilas?.name}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedOrder?.userDetilas?.email}

                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      {selectedOrder.shippingAddress  ||
                        "123 Main Street, Apartment 4B, New Delhi - 110001"}
                    </p>
                 
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(selectedOrder.products || selectedOrder.items || []).map(
                      (item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.name || `Product #${index + 1}`}
                          </TableCell>
                          <TableCell>
                            ₹{item.price?.toFixed(2) || "0.00"}
                          </TableCell>
                          <TableCell>{item.quantity || 1}</TableCell>
                          <TableCell>
                            ₹
                            {((item.price || 0) * (item.quantity || 1)).toFixed(
                              2
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Order Status</h3>
                  <Select
                    defaultValue={selectedOrder.status}
                    // In a real app, this would update the status
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      <strong>Method:</strong>{" "}
                      {selectedOrder.paymentMethod || "Credit Card"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedOrder.paymentStatus || "Paid"}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹
                      {selectedOrder.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
                <Button>Update Order</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
