// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBkKpTDqrsEvfNYZ0X6MB4IE3V1xNIK88",
  authDomain: "datacanvas-auth.firebaseapp.com",
  projectId: "datacanvas-auth",
  storageBucket: "datacanvas-auth.appspot.com",
  messagingSenderId: "825072460221",
  appId: "1:825072460221:web:f440c2133fbe909e24b2d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;