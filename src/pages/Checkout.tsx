import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  CreditCard, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  AlertTriangle,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { useMutation } from '@tanstack/react-query';
import { getToken, orderAPI } from '@/services/api';
import { isAuthenticated, getUser } from '@/services/api';
import { BuyProduct } from '@/services/order'

// Form schema validation
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  street: z.string().min(5, { message: "Please enter a valid street address" }),
  city: z.string().min(2, { message: "Please enter a valid city" }),
  state: z.string().min(2, { message: "Please enter a valid state" }),
  postalCode: z.string().min(5, { message: "Please enter a valid postal code" }),
  country: z.string().min(2, { message: "Please enter a valid country" }),
  paymentMethod: z.enum(['credit_card', 'paypal', 'cash_on_delivery'], {
    required_error: "Please select a payment method",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { items, couponCode, couponDiscount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 1000 ? 0 : 100;
  const discount = couponCode ? (subtotal * (couponDiscount / 100)) : 0;
  const total = subtotal + shippingCost - discount;

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      paymentMethod: 'cash_on_delivery',
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: (orderData: any) => {
      return orderAPI.create(orderData);
    },
    onSuccess: (data) => {
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${data.order._id} has been placed successfully.`,
      });
      dispatch(clearCart());
      navigate(`/order/${data.order._id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to place order",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  // Check if cart is empty
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some products to your cart and come back to checkout.
            </p>
            <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Check if user is authenticated
  const handleCheckoutSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
  
    if (!isAuthenticated()) {
      toast({
        title: "Login Required",
        description: "Please login to complete your order.",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
  
    const user = getUser();
  
    const orderData = {
      userId: user.id,
      products: items.map(item => ({
        _id: item.id,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      })),
      totalAmount: total,
      shippingAddress: {
        firstName: values.firstName,
        lastName: values.lastName,
        street: values.street,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
        phone: values.phone,
      },
      paymentMethod: values.paymentMethod,
      status: 'pending',
    };
  
    const token = getToken();
  
    try {
      await BuyProduct(
        token,
        orderData.products,
        orderData.shippingAddress,
        total,
        user,
        navigate,
        dispatch
      );
  
      // If BuyProduct is successful and you still want to trigger createOrderMutation:
      dispatch(clearCart());
      navigate(`/order`);
      // Or, if BuyProduct already does everything (including order creation), you can skip this line
      // and just rely on BuyProduct entirely.
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong while processing your order.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Step indicators
  const steps = [
    { number: 1, title: 'Shopping Cart' },
    { number: 2, title: 'Shipping Details' },
    { number: 3, title: 'Payment Method' },
  ];

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <a href="/" className="text-muted-foreground hover:text-primary">Home</a>
            </li>
            <li className="mx-2">
              <ChevronRight size={14} className="text-muted-foreground" />
            </li>
            <li>
              <a href="/shop" className="text-muted-foreground hover:text-primary">Shop</a>
            </li>
            <li className="mx-2">
              <ChevronRight size={14} className="text-muted-foreground" />
            </li>
            <li className="text-primary font-medium">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

        {/* Checkout steps */}
        <div className="flex justify-between mb-10 overflow-x-auto">
          {steps.map((s) => (
            <div key={s.number} className="flex items-center">
              <div 
                className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
                  step >= s.number 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > s.number ? (
                  <CheckCircle size={16} />
                ) : (
                  s.number
                )}
              </div>
              <span 
                className={`font-medium ${
                  step >= s.number ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {s.title}
              </span>
              {s.number < steps.length && (
                <div className="mx-3 w-8 h-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCheckoutSubmit)} className="space-y-8">
                {/* Step 1: Review Cart */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Review Your Cart</h2>
                    
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left py-3 px-4">Product</th>
                            <th className="text-center py-3 px-2">Size</th>
                            <th className="text-center py-3 px-2">Price</th>
                            <th className="text-center py-3 px-2">Quantity</th>
                            <th className="text-right py-3 px-4">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {items.map((item, index) => (
                            <tr key={index} className="hover:bg-muted/50">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-16 h-16 rounded border overflow-hidden mr-3">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center py-4 px-2">{item.size}</td>
                              <td className="text-center py-4 px-2">₹{item.price.toFixed(2)}</td>
                              <td className="text-center py-4 px-2">{item.quantity}</td>
                              <td className="text-right py-4 px-4">₹{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button 
                        type="button" 
                        onClick={() => setStep(2)}
                      >
                        Continue to Shipping
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Shipping Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Maharashtra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        Back to Cart
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          form.trigger(['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'postalCode', 'country']).then((isValid) => {
                            if (isValid) setStep(3);
                          });
                        }}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Method
                    </h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 rounded-md border p-4">
                                <RadioGroupItem value="credit_card" id="credit_card" />
                                <FormLabel htmlFor="credit_card" className="flex-1 cursor-pointer">
                                  <div className="flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5" />
                                    <span>Credit/Debit Card</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Pay securely with your card
                                  </p>
                                </FormLabel>
                              </div>
                              
                              <div className="flex items-center space-x-2 rounded-md border p-4">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <FormLabel htmlFor="paypal" className="flex-1 cursor-pointer">
                                  <div className="flex items-center">
                                    <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5 text-blue-600" fill="currentColor">
                                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.586-5.611 4.586H11.44c-.524 0-.965.382-1.048.9l-.346 2.203 2.18.004c.242-.002.484.011.724.043 2.158.287 3.596-.236 4.292-1.607.335-.656.683-1.784.683-1.784l.726-3.892s.156-.795-.429-1.166z"/>
                                    </svg>
                                    <span>PayPal</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Pay with your PayPal account
                                  </p>
                                </FormLabel>
                              </div>
                              
                              <div className="flex items-center space-x-2 rounded-md border p-4">
                                <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                                <FormLabel htmlFor="cash_on_delivery" className="flex-1 cursor-pointer">
                                  <div className="flex items-center">
                                    <Truck className="mr-2 h-5 w-5" />
                                    <span>Cash on Delivery</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Pay when you receive your order
                                  </p>
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Important Note</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            This is a demo store. No actual payment will be processed and no products will be shipped.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-lg border bg-card p-6">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {shippingCost > 0 ? (
                    <span>₹{shippingCost.toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600">Free</span>
                  )}
                </div>

                {couponCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount ({couponCode})</span>
                    <span className="text-red-600">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping and security messages */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over ₹1000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">Protected by industry standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;