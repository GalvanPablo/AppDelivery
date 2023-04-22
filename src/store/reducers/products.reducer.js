import { GET_PRODUCTS, FILTER_PRODUCTS } from "../actions/products.action";

const initialState = {
    productos: [],
    productosFiltrados: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                productos: action.productos,
                productosFiltrados: action.productos
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                productosFiltrados: action.categoria == 0 ? state.productos : state.productos.filter(producto => producto.categoria === action.categoria)
            };
        default:
            return state;
    }
}

export default productsReducer;