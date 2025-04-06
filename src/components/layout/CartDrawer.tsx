
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X, ShoppingCart, Trash, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  toggleCart, 
  removeItem, 
  updateQuantity,
  applyCoupon,
  removeCoupon
} from '@/store/slices/cartSlice';
import { RootState } from '@/store';
import { coponAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, couponCode, couponDiscount } = useSelector((state: RootState) => state.cart);
  const [couponInput, setCouponInput] = React.useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = React.useState(false);
  const { toast } = useToast();

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (free for orders over ₹1000)
  const shipping = subtotal > 1000 ? 0 : 100;
  
  // Calculate discount if coupon applied
  const discount = couponCode ? (subtotal * (couponDiscount / 100)) : 0;
  
  // Calculate total
  const total = subtotal + shipping - discount;

  // Handle increment/decrement quantity
  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, size, quantity }));
    }
  };

  // Handle remove item
  const handleRemoveItem = (id: string, size: string) => {
    dispatch(removeItem({ id, size }));
  };

  // Handle apply coupon
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;

    setIsApplyingCoupon(true);
    try {
      const response = await coponAPI.match(couponInput);
      
      if (response && response.success) {
        dispatch(applyCoupon({ 
          code: response.coupon.code, 
          discount: response.coupon.discountPercentage 
        }));
        toast({
          title: "Coupon Applied",
          description: `You got ${response.coupon.discountPercentage}% off your order!`,
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code you entered is invalid or expired.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply coupon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplyingCoupon(false);
      setCouponInput('');
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your order.",
    });
  };

  // Close cart drawer
  const handleClose = () => {
    dispatch(toggleCart());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg animate-slide-in-right">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-medium flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Your Shopping Cart {items.length > 0 && `(${items.length})`}
            </h2>
            <button onClick={handleClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button onClick={handleClose} asChild>
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 hover:bg-muted"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id, item.size)}
                          className="text-destructive hover:text-destructive/80 flex items-center"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Summary */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Coupon Code */}
              {/* <div>
                <h3 className="text-sm font-medium mb-2">Promo Code</h3>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-primary/10 rounded p-2">
                    <div>
                      <span className="text-sm font-medium">{couponCode}</span>
                      <span className="text-sm text-muted-foreground ml-2">(-{couponDiscount}%)</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-destructive text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponInput.trim()}
                      size="sm"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                )}
              </div> */}

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping > 0 ? (
                    <span>₹{shipping.toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600">Free</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-destructive">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <Button className="w-full" asChild onClick={handleClose}>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={handleClose} asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;