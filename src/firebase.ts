import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig: Record<string, any> = {
  apiKey: "AIzaSyB4iAdm2KrHuQX0K2quhW5yOJK8-Pcd7og",
  authDomain: "meetup-project-844fd.firebaseapp.com",
  databaseURL: "https://meetup-project-844fd.firebaseio.com",
  projectId: "meetup-project-844fd",
  storageBucket: "meetup-project-844fd.appspot.com",
  messagingSenderId: "609264014606",
  appId: "1:609264014606:web:b3f520a8d75b28a6f6b35f"
};
firebase.initializeApp(firebaseConfig);

// utils
const db: any = firebase.firestore();
const auth: any = firebase.auth();

// collection references
const usersCollection: any = db.collection("users");
const provider = new firebase.auth.GoogleAuthProvider();

// export utils/refs
export default { db,auth,usersCollection,provider };
