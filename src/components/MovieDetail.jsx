import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

const BASE_URL = "https://api.themoviedb.org/3/movie/";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}${id}`, API_OPTIONS);
        if (!res.ok) throw new Error("Failed to fetch movie data");
        const data = await res.json();
        setMovie(data);

        const videosRes = await fetch(`${BASE_URL}${id}/videos`, API_OPTIONS);
        if (!videosRes.ok) throw new Error("Failed to fetch videos");
        const videosData = await videosRes.json();

        const trailer = videosData.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );

        if (trailer) setVideoKey(trailer.key);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!movie) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-black text-white p-6 flex flex-col items-center overflow-hidden">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 blur-sm"
        style={{ backgroundImage: `url(${IMG_CDN_URL + movie.backdrop_path})` }}
      ></div>
      {/* Overlay to darken further for text readability */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          {movie.title}
        </h1>

        {/* Overview */}
        <p className="text-lg md:text-xl mb-8 leading-relaxed text-center max-w-3xl">
          {movie.overview}
        </p>

        {/* Trailer */}
        {videoKey ? (
          <div className="w-full aspect-video rounded-md overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?rel=0&controls=1`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <p className="italic text-gray-400">Trailer not available</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
