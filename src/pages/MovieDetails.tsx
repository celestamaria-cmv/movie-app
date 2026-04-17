import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/movieService";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(id!);
        setMovie(data);
      } catch {
        console.log("Error fetching movie");
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{movie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;