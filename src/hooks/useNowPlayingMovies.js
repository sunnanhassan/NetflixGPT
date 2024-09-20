import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getNowPlayingMovies = async () => {

            // Fetch the now playing movies data
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
                API_OPTIONS
            );
            const json = await response.json();

            // Log the results for debugging
            // console.log(json.results);

            // Dispatch the results to Redux store
            dispatch(addNowPlayingMovies(json.results));

        };

        getNowPlayingMovies();
    }, [dispatch]); // Adding dispatch as a dependency
};

export default useNowPlayingMovies;
