import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlaying);

  if (!movies) return null;  // safer to return null explicitly

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} movieId={id} />
      <VideoBackground movieid={id} />
    </div>
  );
};

export default MainContainer;
