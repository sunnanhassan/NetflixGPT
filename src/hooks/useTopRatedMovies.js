import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getTopRatedMovies = async () => {

            // Fetch the now playing movies data
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
                API_OPTIONS
            );
            const json = await response.json();
            console.log("TOP" + json);

            // Log the results for debugging
            // console.log(json.results);

            // Dispatch the results to Redux store
            dispatch(addTopRatedMovies(json.results));

        };

        getTopRatedMovies();
    }, [dispatch]); // Adding dispatch as a dependency
};

export default useTopRatedMovies;
