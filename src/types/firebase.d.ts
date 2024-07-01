import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare module '../types/firebase' {
  export const app: FirebaseApp;
  export const auth: Auth;
  export const db: Firestore;
}
