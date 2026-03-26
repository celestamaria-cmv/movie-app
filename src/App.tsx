import { useEffect, useState } from "react";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>🎬 Movie App</h1>

      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default App;