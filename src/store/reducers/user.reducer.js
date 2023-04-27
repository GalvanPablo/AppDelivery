import { GET_USER_DATA, DELETE_USER_DATA, ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/user.action";

const initialState = {
    nombre: "",
    telefono: "",
    foto: "",
    direcciones: [],
    favoritos: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                nombre: action.nombre,
                telefono: action.telefono,
                foto: action.foto || null,
                direcciones: action.direcciones || null,
                favoritos: action.favoritos || []
            }
        case DELETE_USER_DATA:
            return {
                nombre: "",
                telefono: "",
                foto: "",
                direcciones: [],
                favoritos: [],
            }
        
        case ADD_FAVORITE:
            const index = state.favoritos.findIndex(fav => fav === action.productoId);
            if(index >= 0){
                console.log("El producto ya está en favoritos")
                return state;
            } else {
                console.log("Se agregó el producto a favoritos")
                return {
                    ...state,
                    favoritos: [...state.favoritos, action.productoId]
                }
            }
        
        case REMOVE_FAVORITE:
            console.log("Eliminando producto de favoritos")
            return {
                ...state,
                favoritos: state.favoritos.filter(fav => fav !== action.productoId)
            }
        default:
            return state;
    }
}

export default userReducer;