import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_Languages, USERAVATAR } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/useGPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((store) => store.user);
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGPTSearch);
  // console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        // console.log("User is logged in with UID:", uid, email, displayName);
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="py-2 px-4 mx-2 my-2 bg-gray-800 opacity-90 text-white rounded-lg"
              onClick={handleLanguageChange}
            >
              {SUPPORTED_Languages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-2 my-2 bg-green-800 text-white rounded-lg"
            onClick={handleGPTSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="w-12 h-12" src={USERAVATAR} alt="userIcon" />
          <button onClick={handleSignOut} className="font-bold text-white pl-3">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
