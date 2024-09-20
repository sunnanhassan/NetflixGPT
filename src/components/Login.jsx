import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [IsSignInForm, SetIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null); // Added name ref

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMsg(message);
    if (message) return;

    if (!IsSignInForm) {
      // Sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, // Using name ref
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;

              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorCode}: ${errorMessage}`);
        });
    } else {
      // Sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorCode}: ${errorMessage}`);
        });
    }
  };

  const toggleSigninForm = () => {
    SetIsSignInForm(!IsSignInForm);
  };

  return (
    <div className="bg-gradient-to-b from-black">
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute p-12 bg-black bg-opacity-80 my-32 mx-auto right-0 left-0 text-white rounded-lg "
      >
        <h1 className="font-bold text-3xl py-4">
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!IsSignInForm && (
          <input
            ref={name} // Added ref to name input
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500">{errorMsg}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="p-4 font-semibold cursor-pointer"
          onClick={toggleSigninForm}
        >
          {IsSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already have an account? Sign in"}
        </p>
      </form>
    </div>
  );
};

export default Login;
