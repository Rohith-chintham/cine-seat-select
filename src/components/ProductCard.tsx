
import React from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
