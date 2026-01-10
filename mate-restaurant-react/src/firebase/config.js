import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ5mooPdtWfiR1Ha1Yc_-T-TPgpQhzDHw",
    authDomain: "mate-restaurant.firebaseapp.com",
    projectId: "mate-restaurant",
    storageBucket: "mate-restaurant.firebasestorage.app",
    messagingSenderId: "687744125536",
    appId: "1:687744125536:web:37f209859e02d81f009105",
    measurementId: "G-1KT1MN1KWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, analytics };
