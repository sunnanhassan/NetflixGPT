// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex cursor-pointer">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              id={movie.id} // ✅ Pass the movie ID to MovieCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
