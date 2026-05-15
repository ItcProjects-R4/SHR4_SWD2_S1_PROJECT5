import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style/Home.module.css";
import MovieCard from "../components/MovieCard";
import {
  getPopularMovies,
  getTopRatedMovies,
  hasApiKey,
  imageUrl,
} from "../api/tmdb";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");




  useEffect(() => {
    if (!hasApiKey) {
      setLoading(false);
      setError("Add your TMDB API key in .env as REACT_APP_TMDB_API_KEY");
      return;
    }

    async function loadHomeMovies() {
      try {
        const [popular, topRated] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
        ]);

        setPopularMovies(popular);
        setTopRatedMovies(topRated);
      } catch (err) {
        setError("Could not load movies. Please check your API key.");
      } finally {
        setLoading(false);
      }
    }

    loadHomeMovies();
  }, []);


  const heroMovie = popularMovies[0];
  const trendingMovies = popularMovies.slice(0, 10);
  const screenImages = topRatedMovies.slice(0, 5);
  const topMovies = topRatedMovies.slice(4, 8);

  return (
    <main className={styles.home}>
      {loading && <p className={styles.message}>Loading movies...</p>}
      {error && <p className={styles.message}>{error}</p>}

      {!loading && !error && heroMovie && (
        <>
          <section
            className={styles.hero}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(31, 16, 19, 0.92), rgba(31, 16, 19, 0.45)), url(${imageUrl(
                heroMovie.backdrop_path,
                "original"
              )})`,
            }}
          >
            <div className={styles.heroContent}>
              <span className={styles.badge}>Popular Now</span>
              <h1>{heroMovie.title}</h1>
              <p>{heroMovie.overview}</p>

              <div className={styles.heroActions}>
                <Link to={`/movie/${heroMovie.id}`}>View Details</Link>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Trending Now</h2>
              <span>Movies Trending</span>
            </div>

            <div className={styles.moviesGrid}>
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          <section className={styles.aboutSection}>
            <div className={styles.aboutText}>
              <h2>Beyond the Screen</h2>
              <p>
                Explore movie stories, ratings, posters, and cinematic details
                in one clean experience powered by TMDB API.
              </p>

              
            </div>

            <div className={styles.gallery}>
              {screenImages.map((movie) => (
                <img
                  key={movie.id}
                  src={imageUrl(movie.backdrop_path, "w780")}
                  alt={movie.title}
                />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.centerTitle}>Top Rated Masterpieces</h2>

            <div className={styles.topGrid}>
              {topMovies.map((movie) => (
                <article key={movie.id} className={styles.topCard}>
                  <img src={imageUrl(movie.backdrop_path, "w500")} alt={movie.title} />
                  <div>
                    <span>{movie.vote_average.toFixed(1)}</span>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.features}>
            <h2>The Premium Choice</h2>

            <div className={styles.featureGrid}>
              <div>
                <strong>Movie Search</strong>
                <p>Find movies quickly by name.</p>
              </div>
              <div>
                <strong>Smart Discovery</strong>
                <p>Browse popular and top-rated movies.</p>
              </div>
              <div>
                <strong>Watchlist Ready</strong>
                <p>Save favorite movies later with localStorage.</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Home;
