import { GET_CATEGORIES } from "../actions/categories.action";

const initialState = {
    categorias: []
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:

            //console.log("CATEGORIAS", action.categorias);
            return {
                categorias: action.categories
            };
        default:
            return state;
    }
}

export default categoriesReducer;