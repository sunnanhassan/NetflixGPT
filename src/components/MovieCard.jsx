import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ posterPath, id }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;

  return (
    <div className="w-48 pr-4" onClick={() => navigate(`/movie/${id}`)}>
      <img
        src={IMG_CDN_URL + posterPath}
        alt="moviecard"
        className="cursor-pointer hover:scale-105 transition-transform"
      />
    </div>
  );
};

export default MovieCard;
