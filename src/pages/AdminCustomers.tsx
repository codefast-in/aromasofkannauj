import React, {useState} from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {users, orders} from "@/services/mockData";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search, Mail, ShoppingBag} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {userAPI} from "@/services/api";

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any>([]);
  userAPI
    .getAll()
    .then((res) => {
      setUsers(res.data.users);
    })
    .catch((err) => {
      console.error(err);
    });
  // Filter customers only (not admins)
  const customers = users.filter((user: any) => user.role === "customer");

  // Further filter based on search
  const filteredCustomers = customers.filter((customer:any) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate customer metrics
  const getCustomerOrderCount = (userId: string) => {
    return orders.filter((order) => order.userId === userId).length;
  };

  const getCustomerSpend = (userId: string) => {
    return orders
      .filter((order) => order.userId === userId)
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Customers</h1>
        </div>

        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const orderCount = getCustomerOrderCount(customer.id);
                const totalSpent = getCustomerSpend(customer.id);
                // Use a default date for all customers since createdAt doesn't exist in the user type
                const joinedDate = new Date().toISOString();

                return (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(joinedDate)}</TableCell>
                    <TableCell>{orderCount}</TableCell>
                    <TableCell>₹{totalSpent.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Mail size={16} className="mr-1" />
                          Email
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ShoppingBag size={16} className="mr-1" />
                          Orders
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
