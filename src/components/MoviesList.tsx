
import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { movies } from '@/data/movies';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';

const MoviesList = () => {
  const { setSelectedMovie, setBookingStep } = useBooking();
  
  const handleSelectMovie = (movieId: number) => {
    setSelectedMovie(movieId);
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Film className="mr-2 h-6 w-6 text-cinema-red" />
          <h2 className="text-2xl font-bold text-white">Now Showing</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden bg-black border-gray-800 hover:border-cinema-red transition-all duration-300 group animate-fade-in">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <p className="text-sm text-white mb-2">{movie.duration} | {movie.genre} | {movie.rating}</p>
                    <Button 
                      variant="default" 
                      className="w-full bg-cinema-red hover:bg-red-700"
                      onClick={() => handleSelectMovie(movie.id)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-white text-lg mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.genre} | {movie.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
