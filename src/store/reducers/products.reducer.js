import { GET_PRODUCTS } from "../actions/products.action";

const initialState = {
    productos: [],
    productosFiltrados: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                productos: action.productos
            };
        default:
            return state;
    }
}

export default productsReducer;