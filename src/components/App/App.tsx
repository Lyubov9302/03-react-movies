import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import { useState } from "react";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch {
      setIsError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={handleSelectMovie}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
