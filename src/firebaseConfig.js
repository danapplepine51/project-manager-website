// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import "firebase/auth";
// import "firebase/firestore";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVFQcLuauqKfxDN71hWtJhJSK4ZuUSwmg",
  authDomain: "todo-list-0409-csci5117.firebaseapp.com",
  projectId: "todo-list-0409-csci5117",
  storageBucket: "todo-list-0409-csci5117.appspot.com",
  messagingSenderId: "1010296190921",
  appId: "1:1010296190921:web:c2b6ac6ab7e53989581a18"
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// initalize components
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
