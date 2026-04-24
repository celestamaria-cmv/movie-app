import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieTrailer } from "../services/movieService";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

function MovieDetails() {
  const { id } = useParams();

  // ✅ useFetch for movie
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id!), [id]);

  // ✅ useFetch for trailer
  const { data: trailerKey } = useFetch(
    () => fetchMovieTrailer(id!),
    [id]
  );

  // UI state (still needed)
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center" }}>❌ {error}</p>;
  if (!movie) return null;

  return (
    <motion.div
      style={{ textAlign: "center", padding: "20px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{movie.title}</h1>

      <motion.img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: "12px", marginBottom: "15px" }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      <p style={{ maxWidth: "600px", margin: "0 auto" }}>
        {movie.overview}
      </p>

      {trailerKey && (
        <button
          style={{ marginTop: "15px" }}
          onClick={() => setShowTrailer(true)}
        >
          ▶️ Watch Trailer
        </button>
      )}

      {/* 🎬 MODAL */}
      {showTrailer && trailerKey && (
        <motion.div
          className="modal"
          onClick={() => setShowTrailer(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <span className="close" onClick={() => setShowTrailer(false)}>
              ❌
            </span>

            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default MovieDetails;