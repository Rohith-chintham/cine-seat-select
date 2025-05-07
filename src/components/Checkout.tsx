
import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { movies, showtimes } from '@/data/movies';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Calendar, Ticket } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const { 
    selectedMovie, 
    selectedShowtime, 
    selectedSeats, 
    totalPrice, 
    setBookingStep,
    resetBooking
  } = useBooking();
  
  if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) return null;
  
  const movie = movies.find(m => m.id === selectedMovie);
  const showtime = showtimes.find(s => s.id === selectedShowtime);
  
  const handleBack = () => {
    setBookingStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCompleteBooking = () => {
    toast.success('Booking complete! Tickets have been sent to your email.');
    setTimeout(() => {
      resetBooking();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Seat Selection
        </Button>
        
        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-1">Booking Summary</h2>
            <p className="text-gray-400">Please review your booking details before continuing</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex gap-6">
              <div className="h-32 w-20 overflow-hidden rounded flex-shrink-0">
                <img 
                  src={movie?.poster} 
                  alt={movie?.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{movie?.title}</h3>
                <div className="text-gray-400 mb-2">{movie?.duration} | {movie?.rating}</div>
                
                <div className="flex items-center text-gray-300 mb-1">
                  <Calendar className="h-4 w-4 mr-2 text-cinema-red" />
                  <span>{showtime?.date} | {showtime?.time}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Ticket className="h-4 w-4 mr-2 text-cinema-red" />
                  <span>
                    {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}: {' '}
                    {selectedSeats.map(seat => seat.row + seat.number).join(', ')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Price Details</h4>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-300">
                  <span>Standard Seats</span>
                  <span>${selectedSeats.filter(s => s.type === 'standard').length * 12}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Premium Seats</span>
                  <span>${selectedSeats.filter(s => s.type === 'premium').length * 18}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Convenience Fee</span>
                  <span>$2</span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-3 flex justify-between text-white font-semibold">
                <span>Total Amount</span>
                <span>${totalPrice + 2}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-900">
            <Button 
              className="w-full bg-cinema-red hover:bg-red-700"
              onClick={handleCompleteBooking}
            >
              <Check className="mr-2 h-4 w-4" />
              Complete Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
