import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieTrailer } from "../services/movieService";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(id!);
        setMovie(data);

        const key = await fetchMovieTrailer(id!);
        setTrailerKey(key);
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

      {trailerKey && (
        <button onClick={() => setShowTrailer(true)}>
          ▶️ Watch Trailer
        </button>
      )}

      {showTrailer && trailerKey && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;