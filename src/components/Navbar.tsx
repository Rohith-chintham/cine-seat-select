
import React from 'react';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';

const Navbar = () => {
  const { resetBooking } = useBooking();
  
  return (
    <header className="bg-black py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Ticket className="h-8 w-8 text-cinema-red mr-2" />
          <h1 className="text-white text-xl font-bold tracking-tight lg:text-2xl">CineSelect</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="link" className="text-white">Movies</Button>
          <Button variant="link" className="text-white">Theaters</Button>
          <Button variant="link" className="text-white">Offers</Button>
          <Button variant="ghost" className="text-white hover:text-cinema-gold">Sign In</Button>
        </div>
        <Button variant="default" className="bg-cinema-red hover:bg-red-700" onClick={resetBooking}>
          Book Tickets
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
