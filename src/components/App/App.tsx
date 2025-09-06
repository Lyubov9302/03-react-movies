import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import { useState } from "react";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />;
      <Toaster />
      {isLoading && <Loader />}
      {isError && <Toaster />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </>
  );
}
