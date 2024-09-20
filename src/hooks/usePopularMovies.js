import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getPopularMovies = async () => {

            // Fetch the now playing movies data
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                API_OPTIONS
            );
            const json = await response.json();

            // Log the results for debugging
            // console.log(json.results);

            // Dispatch the results to Redux store
            dispatch(addPopularMovies(json.results));

        };

        getPopularMovies();
    }, [dispatch]); // Adding dispatch as a dependency
};

export default usePopularMovies;
