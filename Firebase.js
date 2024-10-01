import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByHo9TIea4-6_3RzmepwIhKFaRMKBZTEU",
    authDomain: "bdapptimes.firebaseapp.com",
    projectId: "bdapptimes",
    storageBucket: "bdapptimes.appspot.com",
    messagingSenderId: "664933502207",
    appId: "1:664933502207:web:358b7348a5d92e622310ca"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);