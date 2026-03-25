const API_KEY = "86928ee9a3d2f6a1e8e910d1686aa3a3";

export const fetchMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();
  return data.results;
};