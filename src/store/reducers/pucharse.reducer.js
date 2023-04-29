import { GET_PURCHASES, NEW_PURCHASE } from "../actions/pucharse.action";

const initialState = {
    list: [],
}

const pucharseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PURCHASES:
            console.log("GET_PURCHASES");
            return {
                ...state,
                list: action.list
            }
        default:
            return state;
    }
}

export default pucharseReducer;