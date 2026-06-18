import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const params = useParams();

  async function getMovieDetails(id) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    );

    setMovieDetails(data);
  }

  useEffect(() => {
    getMovieDetails(params.id);
  }, [params.id]);

  if (!movieDetails) {
    return <h2 className="text-white p-5">Loading...</h2>;
  }

  return (
    <main className="container py-5 text-white">
      <div className="row g-4 align-items-center">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-100 rounded"
          />
        </div>

        <div className="col-md-6">
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <p>Release Date: {movieDetails.release_date}</p>
          <p>Rate: {movieDetails.vote_average}</p>
        </div>
      </div>
    </main>
  );
}
