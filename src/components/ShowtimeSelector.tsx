
import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { movies, showtimes } from '@/data/movies';
import { Button } from '@/components/ui/button';
import { CalendarCheck, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const ShowtimeSelector = () => {
  const { selectedMovie, setSelectedMovie, setSelectedShowtime, setBookingStep } = useBooking();
  
  if (!selectedMovie) return null;
  
  const movie = movies.find(m => m.id === selectedMovie);
  const movieShowtimes = showtimes.filter(s => s.movieId === selectedMovie);
  
  const today = new Date();
  
  const handleShowtimeSelect = (showtimeId: number) => {
    setSelectedShowtime(showtimeId);
    setBookingStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBack = () => {
    setSelectedMovie(null);
    setBookingStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Movies
        </Button>
        
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Movie Info */}
          <div>
            <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-4">
              <img 
                src={movie?.poster} 
                alt={movie?.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Showtimes */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{movie?.title}</h2>
            <div className="flex items-center mb-4 text-gray-400">
              <span>{movie?.duration}</span>
              <span className="mx-2">•</span>
              <span>{movie?.genre}</span>
              <span className="mx-2">•</span>
              <span>{movie?.rating}</span>
            </div>
            <p className="text-gray-300 mb-6">{movie?.description}</p>
            
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <CalendarCheck className="mr-2 h-5 w-5 text-cinema-red" />
                <h3 className="text-xl font-semibold text-white">Select Showtime</h3>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-3">
                  {format(today, 'EEEE, MMMM d')}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {movieShowtimes.map((showtime) => (
                    <Button
                      key={showtime.id}
                      variant="outline"
                      className="border-gray-700 hover:border-cinema-red hover:bg-cinema-red/10 text-white"
                      onClick={() => handleShowtimeSelect(showtime.id)}
                    >
                      {showtime.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeSelector;
