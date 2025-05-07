
import React from 'react';
import Navbar from '@/components/Navbar';
import MoviesList from '@/components/MoviesList';
import ShowtimeSelector from '@/components/ShowtimeSelector';
import SeatSelector from '@/components/SeatSelector';
import Checkout from '@/components/Checkout';
import { BookingProvider, useBooking } from '@/context/BookingContext';

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
        <BookingSteps />
      </div>
    </BookingProvider>
  );
};

export default Index;
