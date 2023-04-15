import { GET_USER_DATA } from "../actions/user.action";

const initialState = {
    nombre: "",
    telefono: "",
    foto: "",
    direcciones: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                nombre: action.nombre,
                direcciones: action.direcciones
            }
        default:
            return state;
    }
}

export default userReducer;