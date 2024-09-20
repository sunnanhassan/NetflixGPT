import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[19%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:opacity-80">
          <FontAwesomeIcon icon={faPlay} />
          <span> Play</span>
        </button>

        <button className="bg-gray-500 text-white p-4 px-12 text-xl mx-2 bg-opacity-50 rounded-lg">
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>  More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
