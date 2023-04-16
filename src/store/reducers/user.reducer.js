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
                telefono: action.telefono,
                foto: action.foto || null,
                direcciones: action.direcciones || null
            }
        default:
            return state;
    }
}

export default userReducer;