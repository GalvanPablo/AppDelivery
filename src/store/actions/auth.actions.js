import { AUTH_SIGNUP_URL, AUTH_LOGIN_URL, USER_DATA_URL, AUTH_UPDATE_URL } from "../../constants/database";

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

        
        // Actualizar el usuario con el campo "address"
        
        // fetch(AUTH_UPDATE_URL, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         idToken: data.idToken,
        //         address: "123 Main St, Anytown USA",
        //     }),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     if(data.error) {
        //         console.error("Error al actualizar el usuario: ", data.error);
        //     } else {
        //         console.log("Usuario actualizado: ", data);
        //     }
        // })
        // .catch((error) => {
        //     console.error("Error al actualizar el usuario: ", error);
        // });

        ////////////////////////

        // Conseguir datos del usuario

        // fetch(USER_DATA_URL, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         idToken: data.idToken,
        //     }),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log("----------------- Datos del usuario -----------------");
        //     console.log(data);
        //     console.log("-----------------------------------------------------");
        // })
        // .catch((error) => {
        //     console.error("Error:", error);
        // });

        //////////////////////////
        
        dispatch({
            type: LOGIN,
            token: data.idToken,
            userId: data.localId
        });
    } catch (error) {
        console.error(error);
    }
}
