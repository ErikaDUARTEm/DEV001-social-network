import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider, sendPasswordResetEmail, getAuth, onAuthStateChanged, signOut,
} from 'firebase/auth';
import {
  getFirestore, addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc,
} from 'firebase/firestore';
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
export const stateChanged = (user) => onAuthStateChanged(auth, (user));

export const listener = (callback) => onSnapshot(collection(db, 'posts'), callback);

export const signOut2 = () => signOut(auth);

export const currentUserData = () => auth.currentUser;

export const post = (coment, likes, uid) => addDoc(collection(db, 'posts'), coment, likes, uid);

export const getPost = (id) => getDoc(doc(db, 'posts', id));

export const update = (id, newDoc) => updateDoc(doc(db, 'posts', id), { newDoc });

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));
