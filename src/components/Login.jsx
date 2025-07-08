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
  const [isSignInForm, setIsSignInForm] = useState(true); // fixed casing
  const [errorMsg, setErrorMsg] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    if (message) {
      setErrorMsg(message);
      return;
    }

    try {
      if (!isSignInForm) {
        // Sign Up flow
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        await updateProfile(userCredential.user, {
          displayName: name.current.value,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        });

        const { uid, email: userEmail, displayName } = auth.currentUser;
        dispatch(addUser({ uid, email: userEmail, displayName }));
      } else {
        // Sign In flow
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      }
    } catch (error) {
      setErrorMsg(`${error.code}: ${error.message}`);
    }
  };

  const toggleSigninForm = () => setIsSignInForm(!isSignInForm);

  return (
    <div className="bg-gradient-to-b from-black min-h-screen">
      <Header />
      <div className="absolute -z-10 w-full h-full">
        <img
          src={BACKGROUND}
          alt="background"
          className="object-cover w-full h-full"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute p-12 bg-black bg-opacity-80 my-32 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
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

        {errorMsg && <p className="text-red-500 text-sm py-2">{errorMsg}</p>}

        <button
          className="p-4 my-6 bg-red-700 hover:bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="p-4 font-semibold cursor-pointer hover:underline"
          onClick={toggleSigninForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already have an account? Sign in"}
        </p>
      </form>
    </div>
  );
};

export default Login;
