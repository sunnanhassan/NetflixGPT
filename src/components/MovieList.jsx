// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Ensure movies is an array with at least one item
  //   const hasMovies = Array.isArray(movies) && movies.length > 0;
  if (!movies) return;

  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex cursor-pointer">
          {/* Map over movies array to render each MovieCard */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
