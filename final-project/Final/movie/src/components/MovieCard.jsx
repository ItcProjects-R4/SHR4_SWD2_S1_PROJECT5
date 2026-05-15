import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style/MovieCard.module.css";
import { imageUrl } from "../api/tmdb";

function MovieCard({ movie }) {
  const title = movie?.title || "Movie Title";
  const year = movie?.release_date ? movie.release_date.slice(0, 4) : "2026";
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : "8.5";
  const poster = imageUrl(movie?.poster_path);
  const movieId = movie?.id || 1;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={`${styles.favoriteButton} ${
          isFavorite ? styles.favoriteActive : ""
        }`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "Saved" : "Favorite"}
      </button>

      <Link to={`/movie/${movieId}`} className={styles.detailsLink}>
        <img src={poster} alt={title} className={styles.poster} />

        <div className={styles.content}>
          <div className={styles.rating}>{rating}</div>
          <h3>{title}</h3>
          <p>{year}</p>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;
