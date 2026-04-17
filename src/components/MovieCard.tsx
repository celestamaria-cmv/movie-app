import type { Movie } from "../types/movie";
import "./MovieCard.css";
import { Link } from "react-router-dom";

type Props = {
  movie: Movie;
  onAdd: (movie: Movie) => void;
  onRemove?: (id: number) => void;
};

function MovieCard({ movie, onAdd, onRemove }: Props) {
  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="card-content">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average}</p>

        {!onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onAdd(movie);
            }}
          >
            ⭐ Add
          </button>
        )}

        {onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(movie.id);
            }}
          >
            ❌ Remove
          </button>
        )}
      </div>
    </Link>
  );
}

export default MovieCard;