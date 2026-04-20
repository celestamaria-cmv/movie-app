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
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState(0);
  const [page, setPage] = useState(1);

  const { watchlist } = useWatchlist();

  // 🔥 FETCH MOVIES (WITH PAGE)
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies(query, page);

        setMovies((prev) =>
          page === 1 ? data : [...prev, ...data]
        );
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page]);

  // 🔥 SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔍 SEARCH
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      setPage(1);       // 🔥 reset page
      setMovies([]);    // 🔥 clear old movies

      const data = await fetchMovies(query, 1);
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

      {/* 🔍 SEARCH */}
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

      {/* ⭐ FILTERS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Rating:</label>

        <select
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ marginRight: "20px" }}
        >
          <option value={0}>All</option>
          <option value={5}>5+</option>
          <option value={6}>6+</option>
          <option value={7}>7+</option>
          <option value={8}>8+</option>
        </select>

        <label style={{ marginRight: "10px" }}>Genre:</label>

        <select onChange={(e) => setGenre(Number(e.target.value))}>
          <option value={0}>All</option>
          <option value={28}>Action</option>
          <option value={35}>Comedy</option>
          <option value={18}>Drama</option>
          <option value={27}>Horror</option>
          <option value={10749}>Romance</option>
        </select>
      </div>

      {/* ⭐ WATCHLIST */}
      {watchlist.length > 0 && (
        <div style={{ margin: "20px" }}>
          <h2 style={{ marginLeft: "10px" }}>⭐ Your Watchlist</h2>

          <div className="movies-container">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* ⏳ LOADING */}
      {loading && <Loader />}

      {/* ❌ ERROR */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          ❌ {error}
        </p>
      )}

      {/* 😕 EMPTY */}
      {!loading && movies.length === 0 && (
        <p style={{ textAlign: "center" }}>
          😕 No movies found
        </p>
      )}

      {/* 🎬 MOVIES */}
      {!loading && (
        <div className="movies-container">
          {movies
            .filter((movie) => {
              const ratingMatch = movie.vote_average >= rating;
              const genreMatch =
                genre === 0 ||
                movie.genre_ids?.includes(genre);

              return ratingMatch && genreMatch;
            })
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;