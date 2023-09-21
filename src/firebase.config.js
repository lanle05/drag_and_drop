import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDpAnBlxi8MemwtM-4nmRusaefltg1Vdl8",
  authDomain: "drag-n-drop-5fb86.firebaseapp.com",
  projectId: "drag-n-drop-5fb86",
  storageBucket: "drag-n-drop-5fb86.appspot.com",
  messagingSenderId: "435413654323",
  appId: "1:435413654323:web:b02ed4d4970b7ea0777c46",
  measurementId: "G-YX9NWXTVF3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
