import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  // Check if movieNames and movieResults are available and have the same length
  if (!movieNames || !movieResults || movieNames.length !== movieResults.length)
    return null;

  return (
    <div className="p-4 m-4 bg-black text-white">
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName} // Use a unique key for each MovieList component
          title={movieName}
          movies={movieResults[index]} // Access the corresponding movie results
          // <MovieList title={movieNames[0]} movies={movieResults[0]} />
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
