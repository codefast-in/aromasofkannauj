
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Heart } from 'lucide-react';
import { addItem } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  featured?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  rating,
  featured = false,
  className
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addItem({
      id,
      name,
      price,
      quantity: 1,
      size: '50ml', // Default size
      image
    }));
    
    toast({
      title: 'Added to cart',
      description: `${name} has been added to your cart`,
    });
  };
  
  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl',
        featured && 'border-2 border-primary/20',
        className
      )}
    >
      {featured && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
          Featured
        </div>
      )}
      
      <div className="relative overflow-hidden pb-[125%]">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10"></div>
        
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button 
            className="p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-muted-foreground">{category}</span>
        </div>
        
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-serif font-medium text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">₹{price.toFixed(2)}</span>
          
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <svg 
                className="w-4 h-4 text-yellow-500 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1 text-sm text-muted-foreground">{rating}</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary hover:text-white rounded-full"
              onClick={handleAddToCart}
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
