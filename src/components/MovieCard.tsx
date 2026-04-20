import type { Movie } from "../types/movie";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const { watchlist, toggleWatchlist } = useWatchlist();

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="card-content">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average}</p>

        <button
           className={isInWatchlist ? "remove-btn" : "add-btn"}
           onClick={(e) => {
              e.preventDefault();
              toggleWatchlist(movie);
          }}
         >
           {isInWatchlist ? "✔ Added" : "+ Watchlist"}
        </button>
      </div>
    </Link>
  );
}

export default MovieCard;