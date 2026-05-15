import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const imageUrl = (path, size = "w500") => {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const hasApiKey = Boolean(API_KEY);

export const getPopularMovies = async () => {
  const { data } = await api.get("/movie/popular");
  return data.results;
};

export const getTopRatedMovies = async () => {
  const { data } = await api.get("/movie/top_rated");
  return data.results;
};
