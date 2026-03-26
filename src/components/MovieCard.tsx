import type { Movie } from "../types/movie";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      <p>⭐ {movie.vote_average}</p>
    </div>
  );
}

export default MovieCard;