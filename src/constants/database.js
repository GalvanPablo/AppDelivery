import { FIREBASE_KEY } from "./keys";

// Database
export const API_URL = `https://deliveryapp-c5e55-default-rtdb.firebaseio.com/`;

// Authentification
export const AUTH_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
export const AUTH_LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;