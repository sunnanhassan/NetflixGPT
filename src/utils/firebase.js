// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9Kbkp79uKwPLoX7wBOV4dKFRUSWcN62I",
    authDomain: "netflixgpt-6da84.firebaseapp.com",
    projectId: "netflixgpt-6da84",
    storageBucket: "netflixgpt-6da84.appspot.com",
    messagingSenderId: "208516150990",
    appId: "1:208516150990:web:e6738d39355dd5e182c29f",
    measurementId: "G-65RXW193WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();