import { useEffect, useState } from "react";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import Button from "../components/Button";
import "../App.css";
import { useWatchlist } from "../context/WatchlistContext";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { watchlist, toggleWatchlist } = useWatchlist();

  
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

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = query.trim()
        ? await fetchMovies(query)
        : await fetchMovies();

      setMovies(data);
    } catch {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => [...prev, movie]);
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="app">
      <h1 className="title">🎬 Movie App</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <Button text="Search" onClick={handleSearch} />
      </div>

      {watchlist.length > 0 && (
        <div style={{ margin: "20px" }}>
          <h2>⭐ Watchlist</h2>

          <div className="movies-container">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAdd={() => {}}
                onRemove={removeFromWatchlist}
              />
            ))}
          </div>
        </div>
      )}

      {loading && <Loader />}

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          ❌ {error}
        </p>
      )}

      {!loading && movies.length === 0 && (
        <p style={{ textAlign: "center" }}>
          😕 No movies found
        </p>
      )}

      {!loading && (
        <div className="movies-container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={toggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;