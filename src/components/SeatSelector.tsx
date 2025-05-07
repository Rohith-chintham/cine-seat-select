
import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { movies, showtimes } from '@/data/movies';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium';
  status: 'available' | 'selected' | 'occupied';
}

const generateSeats = (): Seat[][] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  // Generate random occupied seats
  const occupiedSeats = new Set();
  const occupiedCount = Math.floor(Math.random() * 20) + 10; // Between 10 and 30 seats
  
  for (let i = 0; i < occupiedCount; i++) {
    const row = rows[Math.floor(Math.random() * rows.length)];
    const number = Math.floor(Math.random() * seatsPerRow) + 1;
    occupiedSeats.add(`${row}${number}`);
  }
  
  return rows.map(row => {
    return Array.from({ length: seatsPerRow }, (_, i) => {
      const number = i + 1;
      const id = `${row}${number}`;
      const isPremium = row === 'G' || row === 'H'; // Premium rows
      
      return {
        id,
        row,
        number,
        type: isPremium ? 'premium' : 'standard',
        status: occupiedSeats.has(id) ? 'occupied' : 'available'
      };
    });
  });
};

const SeatSelector = () => {
  const { 
    selectedMovie, 
    selectedShowtime, 
    selectedSeats, 
    toggleSeat, 
    setBookingStep,
    setSelectedShowtime 
  } = useBooking();
  
  const [seatMap, setSeatMap] = useState<Seat[][]>([]);
  
  useEffect(() => {
    setSeatMap(generateSeats());
  }, [selectedShowtime]);
  
  if (!selectedMovie || !selectedShowtime) return null;
  
  const movie = movies.find(m => m.id === selectedMovie);
  const showtime = showtimes.find(s => s.id === selectedShowtime);
  
  const handleSeatClick = (seat: Seat) => {
    toggleSeat(seat);
  };
  
  const handleBack = () => {
    setSelectedShowtime(null);
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      setBookingStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Showtimes
        </Button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">{movie?.title}</h2>
          <p className="text-gray-400">{showtime?.date} | {showtime?.time}</p>
        </div>
        
        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="h-4 bg-gradient-to-b from-cinema-red/30 to-transparent rounded-t-xl mb-12"></div>
            <div className="text-center mb-16">
              <p className="text-gray-400 text-sm uppercase font-medium tracking-wide">Screen</p>
            </div>
            
            <div className="flex flex-col gap-2 mb-8">
              {seatMap.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                  <div className="w-6 flex items-center justify-center text-gray-500 text-sm">
                    {row[0].row}
                  </div>
                  <div className="flex gap-1">
                    {row.map((seat, seatIndex) => (
                      <button
                        key={seat.id}
                        className={cn(
                          "w-6 h-6 rounded-t text-xs transition-all",
                          seat.status === 'occupied' && "bg-cinema-seat-occupied cursor-not-allowed",
                          seat.status === 'available' && seat.type === 'standard' && "bg-cinema-seat-available hover:bg-cinema-seat-selected",
                          seat.status === 'available' && seat.type === 'premium' && "bg-cinema-seat-premium hover:bg-cinema-seat-selected",
                          selectedSeats.some(s => s.id === seat.id) && "bg-cinema-seat-selected"
                        )}
                        disabled={seat.status === 'occupied'}
                        onClick={() => handleSeatClick(seat)}
                      ></button>
                    ))}
                  </div>
                  <div className="w-6 flex items-center justify-center text-gray-500 text-sm">
                    {row[0].row}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t bg-cinema-seat-available"></div>
                <span className="text-sm text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t bg-cinema-seat-selected"></div>
                <span className="text-sm text-gray-400">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t bg-cinema-seat-occupied"></div>
                <span className="text-sm text-gray-400">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t bg-cinema-seat-premium"></div>
                <span className="text-sm text-gray-400">Premium</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Selected Seats</h3>
              <p className="text-gray-400">
                {selectedSeats.length > 0 
                  ? selectedSeats.map(seat => seat.row + seat.number).join(', ')
                  : 'No seats selected'}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold text-white">Price</h3>
              <p className="text-gray-400">
                {selectedSeats.length > 0 
                  ? `$${selectedSeats.reduce((total, seat) => total + (seat.type === 'standard' ? 12 : 18), 0)}`
                  : '-'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Info className="h-4 w-4 mr-2" />
            <p>Standard seats: $12 | Premium seats: $18</p>
          </div>
          
          <Button 
            className="w-full bg-cinema-red hover:bg-red-700"
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
