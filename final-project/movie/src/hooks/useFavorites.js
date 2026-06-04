import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("movie_favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (movie) => {
    const isAlreadyFav = favorites.some((fav) => fav.id === movie.id);
    const newFavs = isAlreadyFav
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(newFavs);
    localStorage.setItem("movie_favorites", JSON.stringify(newFavs));
  };

  const checkIsFavorite = (id) => favorites.some((fav) => fav.id === id);

  return { favorites, toggleFavorite, checkIsFavorite };
};
