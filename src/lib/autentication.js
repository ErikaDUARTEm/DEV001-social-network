import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider, sendPasswordResetEmail, getAuth,
} from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { app } from './firebase.js';

export const auth = getAuth(app);
const db = getFirestore();
export const singup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
export const userCollection = (email, fullName, userName, password) => addDoc(
  collection(db, 'users'),
  {
    email, fullName, userName, password,
  },
);
