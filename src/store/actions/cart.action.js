export const ADD_TO_CART = 'ADD_TO_CART';
export const addToCart = (product, cant) => ({
    type: ADD_TO_CART,
    product,
    cant
})

export const CHANGE_CANT_CART = 'CHANGE_CANT_CART';
export const changeCantCart = (idProduct, cant) => ({
    type: CHANGE_CANT_CART,
    idProduct,
    cant
})

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const removeFromCart = (idProduct) => ({
    type: REMOVE_FROM_CART,
    idProduct
})

export const CLEAR_CART = 'CLEAR_CART';
export const clearCart = () => ({
    type: CLEAR_CART
})