import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';

export const singup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
