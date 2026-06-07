import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { FavoriteWrapper } from "../components/FavoriteWrapper";
import { hasApiKey, searchMovies } from "../api/tmdb";
import styles from "../style/SearchResults.module.css";

function SearchResults() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Write a movie name first.");
      setMovies([]);
      return;
    }

    if (!hasApiKey) {
      setError("Add your TMDB API key in .env as REACT_APP_TMDB_API_KEY");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError("Could not search movies. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.searchPage}>
      <section className={styles.header}>
        <h1>Search Movies</h1>

        <form className={styles.form} onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Movie name"
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {loading && <p className={styles.message}>Loading movies...</p>}
      {error && <p className={styles.message}>{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <section className={styles.moviesGrid}>
          {movies.map((movie) => (
            <FavoriteWrapper key={movie.id} movie={movie}>
              <MovieCard movie={movie} />
            </FavoriteWrapper>
          ))}
        </section>
      )}
    </main>
  );
}

export default SearchResults;
