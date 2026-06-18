import { Link } from "react-router-dom";
import styles from "../style/MovieCard.module.css";
import { imageUrl } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className={styles.movieCard}>
      <img
        src={imageUrl(movie.poster_path)}
        alt={movie.title}
      />

      <h2>{movie.title}</h2>
      <p>{(movie.overview || "").split(" ").slice(0, 18).join(" ")}...</p>

      <div className={styles.buttons}>
        <Link to={`/moviedetails/${movie.id}`} className={styles.detailsButton}>
          View Details
        </Link>

        <button
          type="button"
          onClick={() => toggleFavorite(movie)}
          className={styles.favoriteButton}
        >
          {isFavorite ? "Remove Fav" : "Add Fav"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
