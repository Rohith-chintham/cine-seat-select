
import React from 'react';
import Navbar from '@/components/Navbar';
import MoviesList from '@/components/MoviesList';
import ShowtimeSelector from '@/components/ShowtimeSelector';
import SeatSelector from '@/components/SeatSelector';
import Checkout from '@/components/Checkout';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BookingSteps = () => {
  const { bookingStep } = useBooking();
  
  return (
    <>
      {bookingStep === 1 && <MoviesList />}
      {bookingStep === 2 && <ShowtimeSelector />}
      {bookingStep === 3 && <SeatSelector />}
      {bookingStep === 4 && <Checkout />}
    </>
  );
};

const Index = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-cinema-darkbg">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-end">
          <Link to="/store">
            <Button variant="secondary">
              Visit Our Store
            </Button>
          </Link>
        </div>
        <BookingSteps />
      </div>
    </BookingProvider>
  );
};

export default Index;
