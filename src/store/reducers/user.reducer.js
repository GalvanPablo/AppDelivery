import { GET_USER_DATA, DELETE_USER_DATA, ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES } from "../actions/user.action";

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

        case GET_FAVORITES:
            return {
                ...state,
                favoritos: action.favoritos || []
            }

        default:
            return state;
    }
}

export default userReducer;