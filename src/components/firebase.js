// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const NEXT_PUBLIC_FIREBASE_API_KEY= "AIzaSyDcyVasMykMUUKdh-vB19Wjk2Op5rVOqsE"
const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= "seoblog-30557.firebaseapp.com"
const NEXT_PUBLIC_FIREBASE_PROJECT_ID= "seoblog-30557"
const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= "seoblog-30557.firebasestorage.app"
const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= "37436496345"
const NEXT_PUBLIC_FIREBASE_APP_ID= "1:37436496345:web:b3916839656826ec7d21c8"

const firebaseConfig = {
  
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDb, auth, storage };
