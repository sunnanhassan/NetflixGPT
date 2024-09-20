import { useDispatch } from "react-redux";
import { addTrailerVideos } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";



const useMovieTrailer = (movieid) => {
    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
            API_OPTIONS
        );
        const json = await response.json();

        const trailer = json.results.filter((video) => video.type === "Trailer");

        // Dispatch the first trailer if available
        dispatch(addTrailerVideos(trailer.length > 0 ? trailer[0] : null));
    };

    useEffect(() => {
        if (movieid) {
            getMovieVideos();
        }
    }, [movieid]);
}

export default useMovieTrailer