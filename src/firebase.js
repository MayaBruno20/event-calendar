import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUaJu-1KMNpMmoTsQj9qI_WwmBGSmrxmU",
    authDomain: "calendario-dd0df.firebaseapp.com",
    projectId: "calendario-dd0df",
    storageBucket: "calendario-dd0df.appspot.com",
    messagingSenderId: "43325942921",
    appId: "1:43325942921:web:4bf206971ccbc167372a58",
    measurementId: "G-1VVSFG3WDN"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
