import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieid }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieid);

  return (
    <div className="w-screen">
      {trailerVideo ? (
        <iframe
          className="w-screen aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailerVideo.key +
            "?autoplay=1&mute=1&cc_load_policy=0&controls=0&modestbranding=1&disablekb=1&iv_load_policy=3&rel=0"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default VideoBackGround;
