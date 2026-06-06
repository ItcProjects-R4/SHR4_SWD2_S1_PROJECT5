import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import styles from "../style/Favorites.module.css";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>
          Your favorite movies will appear here. Start saving some!
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
