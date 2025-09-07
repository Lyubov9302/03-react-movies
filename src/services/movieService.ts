import axios from "axios";
import { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    }
  );
  return response.data.results;
};
