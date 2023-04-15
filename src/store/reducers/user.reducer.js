import { GET_USER_DATA } from "../actions/user.action";

const initialState = {
    nombre: "",
    apellido: "",
    telefono: "",
    direcciones: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                nombre: action.nombre,
                apellido: action.apellido,
                direcciones: action.direcciones
            }
        default:
            return state;
    }
}

export default userReducer;