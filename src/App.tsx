import type { Movie } from "./types/movie";

const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster_path: "",
    release_date: "2010",
    vote_average: 8.8,
  },
  {
    id: 2,
    title: "Interstellar",
    poster_path: "",
    release_date: "2014",
    vote_average: 8.6,
  },
];

function App() {
  return (
    <div>
      <h1>🎬 Movie App</h1>

      {movies.map((movie) => {
        return <p key={movie.id}>{movie.title}</p>;
      })}
    </div>
  );
}

export default App;