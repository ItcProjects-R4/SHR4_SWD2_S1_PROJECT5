import { createContext, useState, useEffect, useContext } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load data from localStorage only once when the app mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movie_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (movie) => {
    let updatedFavorites = [];
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("movie_favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to easily grab favorites in any component
export const useFavorites = () => useContext(FavoritesContext);
