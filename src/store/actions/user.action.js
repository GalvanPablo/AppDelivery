import { API_URL } from "../../constants/database";

export const GET_USER_DATA = 'GET_USER_DATA';
export const getUserData = (userId) => async dispatch => {
    try{
        const response = await fetch(`${API_URL}usuarios/${userId}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            throw new Error(message, errorId);
        }

        const data = await response.json();

        if(data){
            dispatch({
                type: GET_USER_DATA,
                nombre: data.nombre,
                telefono: data.telefono,
                foto: data.foto,
                direcciones: data.direcciones
            });   
        }

    }catch(error){
        console.error(error);
        console.log("Error en getUserData")
    }
}

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const updateUserData = (userId, nombre, telefono, foto, direcciones) => async dispatch => {
    try{
        const response = await fetch(`${API_URL}usuarios/${userId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                telefono,
                foto,
                direcciones
            })
        });
        
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            throw new Error(message, errorId);
        }

        const data = await response.json();

        if(data){
            console.log("Se actualizaron los datos del usuario")
            dispatch({
                type: UPDATE_USER_DATA,
                nombre,
                telefono,
                foto,
                direcciones
            });
            dispatch(getUserData(userId));  
        }

    }catch(error){
        console.error(error);
        console.log("Error en updateUserData")
    }
}

export const DELETE_USER_DATA = 'DELETE_USER_DATA';
export const deleteUserData = () => ({
    type: DELETE_USER_DATA,
});


export const ADD_FAVORITE = 'ADD_FAVORITE';
export const addFavorite = (productoId) => ({
    type: ADD_FAVORITE,
    productoId
});

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const removeFavorite = (productoId) => ({
    type: REMOVE_FAVORITE,
    productoId
});