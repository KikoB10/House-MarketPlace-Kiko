// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAEmetDojz29tsHxNQw7s_KRvTbKUlvQaE',
  authDomain: 'house-marketplace-app-kiko.firebaseapp.com',
  projectId: 'house-marketplace-app-kiko',
  storageBucket: 'house-marketplace-app-kiko.appspot.com',
  messagingSenderId: '780695462627',
  appId: '1:780695462627:web:bd271ab897527389c4dbd6',
  measurementId: 'G-F1PEE5S0B9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
