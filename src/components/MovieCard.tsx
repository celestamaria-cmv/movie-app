import type { Movie } from "../types/movie";
import "./MovieCard.css";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  return (
    <div className="card">
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
  />

  <div className="card-content">
    <h3>{movie.title}</h3>
    <p>⭐ {movie.vote_average}</p>
  </div>
</div>
  );
}

export default MovieCard;