
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Store = () => {
  const { totalItems } = useCart();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">ShopMart</h1>
          <Button variant="outline" className="relative">
            <ShoppingCart className="mr-1" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 mt-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <ProductList />
      </main>
      
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">© 2025 ShopMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Store;
