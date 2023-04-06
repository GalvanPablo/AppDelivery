import { AUTH_SIGNUP_URL, AUTH_LOGIN_URL } from "../../constants/database";

export const SIGNUP = 'SIGNUP';
export const signup = (email, password) => async dispatch => {
    try {
        const response = await fetch(AUTH_SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
        });
    
        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Este email ya se encuentra registrado!';
            }
            throw new Error(message);
        }
    
        const data = await response.json();
        
        dispatch({
            type: SIGNUP,
            token: data.idToken,
            userId: data.localId
        });
    } catch (error) {
        console.error(error);
    }
}

export const LOGIN = 'LOGIN';
export const login = (email, password) => async dispatch => {
    try {
        const response = await fetch(AUTH_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
        });
    
        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Este email no se encuentra registrado!';
            }
            if (errorId === 'INVALID_PASSWORD') {
                message = 'La contraseña es incorrecta!';
            }
            throw new Error(message);
        }
    
        const data = await response.json();
        console.log(data);
        
        dispatch({
            type: LOGIN,
            token: data.idToken,
            userId: data.localId
        });
    } catch (error) {
        console.error(error);
    }
}
