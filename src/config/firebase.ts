import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDR1jFWkQxYJrymSdq0iJpAjjAQjDGSegw',
  authDomain: 'ai-trip-planner-79d60.firebaseapp.com',
  projectId: 'ai-trip-planner-79d60',
  storageBucket: 'ai-trip-planner-79d60.firebasestorage.app',
  messagingSenderId: '787353021022',
  appId: '1:787353021022:web:b88e1795a4b6a29747a2cf',
  measurementId: 'G-7QPDZJ0BHR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
