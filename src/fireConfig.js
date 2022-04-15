// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAohZuD-rFcwReWkq8hn168kPpOpMjMKFw",
  authDomain: "html-project-fac8e.firebaseapp.com",
  databaseURL: "https://html-project-fac8e-default-rtdb.firebaseio.com",
  projectId: "html-project-fac8e",
  storageBucket: "html-project-fac8e.appspot.com",
  messagingSenderId: "310259205976",
  appId: "1:310259205976:web:5e7861c1ba1e0b6ed3c72d",
  measurementId: "G-KC4JTR5PND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
export default fireDB;