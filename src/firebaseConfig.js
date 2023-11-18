import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzIK4htX7XVtG_IjxTxXmmYeVRBewE__c",
  authDomain: "pomodorotogether-a225c.firebaseapp.com",
  databaseURL: "https://pomodorotogether-a225c-default-rtdb.firebaseio.com",
  projectId: "pomodorotogether-a225c",
  storageBucket: "pomodorotogether-a225c.appspot.com",
  messagingSenderId: "599168027054",
  appId: "1:599168027054:web:33551689a1aade1850603f",
  measurementId: "G-R3R18B5GD9",
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
