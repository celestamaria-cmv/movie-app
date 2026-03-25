import { useEffect, useState } from "react";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>🎬 Movie App</h1>

      {movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}

export default App;