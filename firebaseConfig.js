// Import the functions you need from the SDKs you need
import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY8CbKhYOZ3-FZVLHXb-jx6ZOzU0jQadU",
  authDomain: "my-awseome-project-202213.firebaseapp.com",
  projectId: "my-awseome-project-202213",
  storageBucket: "my-awseome-project-202213.appspot.com",
  messagingSenderId: "1053590536608",
  appId: "1:1053590536608:web:c14762a995bd4a6ff824c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db }
