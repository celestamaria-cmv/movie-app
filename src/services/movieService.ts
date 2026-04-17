const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (query?: string) => {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  const data = await response.json();
  return data;
};

export const fetchMovieTrailer = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
  );

  const data = await response.json();

  const video = data.results.find(
    (v: any) => v.site === "YouTube"
  );

  return video?.key;
};