import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import styles from "../style/FavoriteWrapper.module.css";

export const FavoriteWrapper = ({ movie, children }) => {
  const { toggleFavorite, checkIsFavorite } = useFavorites();
  const isFav = checkIsFavorite(movie?.id);

  return (
    <div className={styles.wrapper}>
      {children}
      <button
        className={`${styles.workingBtn} ${isFav ? styles.isFav : ""}`}
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
      >
        {isFav ? "Saved" : "Favorite"}
      </button>
    </div>
  );
};
