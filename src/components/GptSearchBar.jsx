import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { GAPI_KEY, API_OPTIONS } from "../utils/constants"; // Ensure these are correct
import { addGptMovieResult } from "../utils/useGPTSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const langkey = useSelector((store) => store.config.lang);

  const [AiMovieList, setAiMovieList] = useState([]); // Define AiMovieList state

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie data.");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return [];
    }
  };

  const handleGptSearchClick = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const prompt = `Act as a Movie or Seasons Recommendation system and suggest some movies and Seasons for the query: ${searchText.current.value.trim()}. Only give me the name of five movies, comma separated like the example result given ahead. Example Result: 3 idiots, Tare Zameen Par, Tiger 3, Barfi, Dangal, Drishyam, Bajrangi Bhaijaan.`;

    if (!prompt) {
      console.log("Prompt is empty.");
      return;
    }

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(GAPI_KEY); // Use the imported API key

      const safetySettings = [
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ];

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings, // Apply the custom safety settings
      });

      const result = await model.generateContent(prompt);

      if (!result || !result.response) {
        throw new Error("Invalid response from the API.");
      }

      const movies = result.response
        .text()
        .split(",")
        .map((movie) => movie.trim());
      setAiMovieList(movies); // Update state with the generated movie list

      console.log(movies);

      const data = movies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(data);

      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: movies, movieResults: tmdbResults })
      ); // Dispatch the results to Redux store
    } catch (error) {
      console.error("Error generating or fetching content:", error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={handleGptSearchClick} // Handle form submission
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={
            lang[langkey]?.GptSearchPlaceHolder || "Enter your search"
          }
        />
        <button
          type="submit" // Trigger form's onSubmit event
          className="col-span-3 m-4 py-2 px-4 bg-red-500 text-white rounded-lg"
        >
          {lang[langkey]?.search || "Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
