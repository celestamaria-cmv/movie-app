const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (query?: string) => {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
};