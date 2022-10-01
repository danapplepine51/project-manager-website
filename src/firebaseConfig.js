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
  apiKey: "AIzaSyAUssiupQpyC5v_o-A8ke9H89qsWkFM0Aw",
  authDomain: "project2-manage-assignment.firebaseapp.com",
  projectId: "project2-manage-assignment",
  storageBucket: "project2-manage-assignment.appspot.com",
  messagingSenderId: "452271467500",
  appId: "1:452271467500:web:250cf5f235cf389c512ec9"
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// initalize components
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
