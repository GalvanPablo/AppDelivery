import { ADD_TO_CART, CHANGE_CANT_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/cart.action";

const initialState = {
    list: [],
    total: 0
};

const getTotal = (list) => {
    let total = 0;
    list.forEach(item => {
        total += item.product.precio * item.cant;
    });
    return total;
}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            console.log('ADD_TO_CART');

            const addList = [...state.list];
            const addIndex = addList.findIndex(item => item.product.id === action.product.id);
            if (addIndex !== -1) {
                console.log("Actualizando cantidad")
                addList[addIndex].cant += action.cant;
            } else {
                console.log("Agregando nuevo producto")
                addList.push({
                    product: action.product,
                    cant: action.cant
                });
            }


            
            return {
                ...state,
                list: addList,
                total: getTotal(addList)
            };
        
        case CHANGE_CANT_CART:
            const changeList = [...state.list];
            const changeIndex = changeList.findIndex(item => item.product.id === action.idProduct);
            if (changeIndex !== -1) {
                changeList[changeIndex].cant = action.cant;
            }
            return {
                ...state,
                list: changeList,
                total: getTotal(changeList)
            };

        case REMOVE_FROM_CART:
            const removeList = [...state.list];
            const removeIndex = removeList.findIndex(item => item.product.id === action.idProduct);
            if (removeIndex !== -1) {
                removeList.splice(removeIndex, 1);
            }
            return {
                ...state,
                list: removeList,
                total: getTotal(removeList)
            };

        case CLEAR_CART:
            return {
                ...state,
                list: [],
                total: 0
            }

        default:
            return state;
    }
}

export default cartReducer;