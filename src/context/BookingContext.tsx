
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium';
  status: 'available' | 'selected' | 'occupied';
}

interface BookingContextType {
  selectedMovie: number | null;
  setSelectedMovie: (movieId: number | null) => void;
  selectedShowtime: number | null;
  setSelectedShowtime: (showtimeId: number | null) => void;
  selectedSeats: Seat[];
  toggleSeat: (seat: Seat) => void;
  resetSeats: () => void;
  totalPrice: number;
  bookingStep: number;
  setBookingStep: (step: number) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookingStep, setBookingStep] = useState<number>(1);
  
  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    
    if (selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
    }
  };
  
  const resetSeats = () => {
    setSelectedSeats([]);
  };
  
  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    resetSeats();
    setBookingStep(1);
  };
  
  const totalPrice = selectedSeats.reduce((total, seat) => {
    return total + (seat.type === 'standard' ? 12 : 18);
  }, 0);
  
  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        selectedShowtime,
        setSelectedShowtime,
        selectedSeats,
        toggleSeat,
        resetSeats,
        totalPrice,
        bookingStep,
        setBookingStep,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
