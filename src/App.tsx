import { useEffect, useState } from "react";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="app">
      <h1 className="title">🎬 Movie App</h1>

      {/* Loading */}
      {loading && <p>Loading movies...</p>}

      {/* Error */}
      {error && <p>{error}</p>}

      {/* Movies */}
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;