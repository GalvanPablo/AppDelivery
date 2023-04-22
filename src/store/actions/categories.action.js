import { API_URL } from "../../constants/database";

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const getCategories = () => async dispatch => {
    try{
        const response = await fetch(`${API_URL}categorias.json`, {
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
            const categories = [];
            for (const key in data) {
                categories.push({
                    id: key,
                    nombre: data[key].nombre,
                });
            }

            dispatch({
                type: GET_CATEGORIES,
                categories
            });   
        }

    }catch(error){
        console.error("Error en getCategories", error);
    }
}