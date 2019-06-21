import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyC7PuV3WxHkcpqJHgG7DJU1InSe6-DrJVg",
  authDomain: "react-chat-app-20517.firebaseapp.com",
  databaseURL: "https://react-chat-app-20517.firebaseio.com",
  projectId: "react-chat-app-20517",
  storageBucket: "",
  messagingSenderId: "437258096120",
  appId: "1:437258096120:web:543c0541fabaddc9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
