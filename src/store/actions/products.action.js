import { API_URL } from "../../constants/database";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const getProducts = () => async dispatch => {
    try{
        const response = await fetch(`${API_URL}productos.json`, {
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
            const productos = [];
            for (const key in data) {
                productos.push({
                    id: key,
                    nombre: data[key].nombre,
                    precio: data[key].precio,
                    categoria: data[key].categoria,
                    imagen: data[key].imagen,
                    descripcion: data[key].descripcion
                });
            }

            dispatch({
                type: GET_PRODUCTS,
                productos
            });  
        }

    }catch(error){
        console.error("Error en getCategories", error);
    }
}

export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const filterProducts = (categoria) => ({
    type: FILTER_PRODUCTS,
    categoria
})