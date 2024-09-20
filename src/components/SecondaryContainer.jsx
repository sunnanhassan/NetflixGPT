import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  // Access movies state from Redux
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-12 pl-10 relative z-20 ">
        <MovieList title={"Now Playing"} movies={movies.nowPlaying} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.addPopularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
