import { FIREBASE_KEY } from "./keys";

export const AUTH_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
export const AUTH_LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
export const AUTH_UPDATE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_KEY}`;

export const USER_DATA_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_KEY}`;