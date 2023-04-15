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
                apellido: data.apellido,
                direcciones: data.direcciones
            });   
        }

    }catch(error){
        console.error(error);
        console.log("Error en getUserData")
    }
}