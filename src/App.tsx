import { useEffect, useState } from "react";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // 🔥 Initial load (popular movies)
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  // 🔍 Search function
  const handleSearch = async () => {
    if (!query) return;

    try {
      setLoading(true);
      setError(null);
      setMovies([]); 

      const data = await fetchMovies(query);
      setMovies(data);
    } catch {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🎬 Movie App</h1>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleSearch();
             }
           }}
        />

        <Button text="Search" onClick={handleSearch} />
      </div>

      {/* ⏳ Loading */}
      {loading && <Loader />}

      {/* ❌ Error */}
      {error && <p>{error}</p>}

      {/* 📭 Empty */}
      {!loading && movies.length === 0 && <p>No movies found</p>}

      {/* 🎬 Movies */}
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;