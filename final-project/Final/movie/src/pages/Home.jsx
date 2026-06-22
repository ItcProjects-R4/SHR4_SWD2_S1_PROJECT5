import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../style/Home.module.css";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  async function getTrending() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    );

    setTrendingMovies(data.results);
  }

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <main className={styles.home}>
      <section
        className={styles.hero}
        style={{
          backgroundImage:
            trendingMovies.length > 0
              ? `linear-gradient(90deg, rgba(31, 16, 19, 0.92), rgba(31, 16, 19, 0.45)), url(https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path})`
              : "",
        }}
      > 
        {trendingMovies.length > 0 && (
          <div className={styles.heroContent}>
         
            <h1>{trendingMovies[0].title}</h1>
            <p>{trendingMovies[0].overview}</p>

            <div className={styles.heroActions}>
              <Link to={`/moviedetails/${trendingMovies[0].id}`}>
                View Details
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h1 className={styles.trendingTitle}>Trending</h1>

        <div className="row g-4">
          {trendingMovies.map((movie) => {
            const isFavorite = favorites.some((fav) => fav.id === movie.id);

            return (
              <div key={movie.id} className="col-md-2 col-sm-4">
                <div className={styles.movieBox}>
                  <Link to={`/moviedetails/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-100"
                    />

                    <h2>{movie.title}</h2>
                    <p>
                      {(movie.overview || "").split(" ").slice(0, 10).join(" ")}
                      ...
                    </p>
                  </Link>

                  <div className={styles.buttons}>
                    <Link
                      to={`/moviedetails/${movie.id}`}
                      className={styles.detailsButton}
                    >
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
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
