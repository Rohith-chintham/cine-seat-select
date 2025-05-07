
export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  duration: string;
  rating: string;
  description: string;
}

export interface Showtime {
  id: number;
  movieId: number;
  time: string;
  date: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1608889175638-9322300c74e8?q=80&w=1000&auto=format&fit=crop",
    genre: "Sci-Fi",
    duration: "2h 49m",
    rating: "PG-13",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1000&auto=format&fit=crop",
    genre: "Action",
    duration: "2h 32m",
    rating: "PG-13",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 3,
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
    genre: "Action",
    duration: "2h 28m",
    rating: "PG-13",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 4,
    title: "Parasite",
    poster: "https://images.unsplash.com/photo-1627057576903-f6d7non-get-blocked-2c5bc?q=80&w=1000&auto=format&fit=crop",
    genre: "Thriller",
    duration: "2h 12m",
    rating: "R",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
  }
];

export const showtimes: Showtime[] = [
  { id: 1, movieId: 1, time: "10:00 AM", date: "2025-05-07" },
  { id: 2, movieId: 1, time: "1:30 PM", date: "2025-05-07" },
  { id: 3, movieId: 1, time: "4:15 PM", date: "2025-05-07" },
  { id: 4, movieId: 1, time: "7:00 PM", date: "2025-05-07" },
  { id: 5, movieId: 1, time: "9:45 PM", date: "2025-05-07" },
  
  { id: 6, movieId: 2, time: "11:15 AM", date: "2025-05-07" },
  { id: 7, movieId: 2, time: "2:00 PM", date: "2025-05-07" },
  { id: 8, movieId: 2, time: "4:45 PM", date: "2025-05-07" },
  { id: 9, movieId: 2, time: "7:30 PM", date: "2025-05-07" },
  { id: 10, movieId: 2, time: "10:15 PM", date: "2025-05-07" },
  
  { id: 11, movieId: 3, time: "10:30 AM", date: "2025-05-07" },
  { id: 12, movieId: 3, time: "1:15 PM", date: "2025-05-07" },
  { id: 13, movieId: 3, time: "4:00 PM", date: "2025-05-07" },
  { id: 14, movieId: 3, time: "6:45 PM", date: "2025-05-07" },
  { id: 15, movieId: 3, time: "9:30 PM", date: "2025-05-07" },
  
  { id: 16, movieId: 4, time: "11:45 AM", date: "2025-05-07" },
  { id: 17, movieId: 4, time: "2:30 PM", date: "2025-05-07" },
  { id: 18, movieId: 4, time: "5:15 PM", date: "2025-05-07" },
  { id: 19, movieId: 4, time: "8:00 PM", date: "2025-05-07" },
  { id: 20, movieId: 4, time: "10:45 PM", date: "2025-05-07" }
];
