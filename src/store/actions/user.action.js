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
            });
            dispatch(getFavorites());
        }

    }catch(error){
        console.error(error);
        console.log("Error en getUserData")
    }
}

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const updateUserData = (userId, nombre, telefono, foto) => async dispatch => {
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
            dispatch({
                type: UPDATE_USER_DATA,
                nombre,
                telefono,
                foto,
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

export const GET_FAVORITES = 'GET_FAVORITES';
export const getFavorites = () => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if(!userId){
        return;
    }

    try{
        const response = await fetch(`${API_URL}usuarios/${userId}/favoritos.json`, {
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
                type: GET_FAVORITES,
                favoritos: data
            });
        }

    }catch(error){
        console.error(error);
        console.log("Error en getFavorites")
    }
}


export const ADD_FAVORITE = 'ADD_FAVORITE';
export const addFavorite = (productoId) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if(!userId){
        return;
    }

    const favoritos = getState().user.favoritos;
    if(favoritos.includes(productoId)){
        return;
    }else

    try{
        favoritos.push(productoId);
        const response = await fetch(`${API_URL}usuarios/${userId}/favoritos.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favoritos)
        });

        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            throw new Error(message, errorId);
        }

        if(response.ok && response.status === 200){
            alert("Producto agregado a favoritos");
            dispatch(getFavorites());
        }

    }catch(error){
        console.error(error);
        console.log("Error en addFavorite")
    }
};


export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const removeFavorite = (productoId) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if(!userId){
        return;
    }

    const favoritos = getState().user.favoritos;
    const favIndex = favoritos.findIndex(fav => fav === productoId);
    if(favIndex < 0){
        return;
    }
    

    try{
        favoritos.splice(favIndex, 1);
        const response = await fetch(`${API_URL}usuarios/${userId}/favoritos.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favoritos)
        });

        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            throw new Error(message, errorId);
        }

        if(response.ok && response.status === 200){
            alert("Producto eliminado de favoritos");
        }
        dispatch(getFavorites());

    }catch(error){
        console.error(error);
        console.log("Error en addFavorite")
    }
}
