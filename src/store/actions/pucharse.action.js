import { API_URL } from "../../constants/database";

import { clearCart } from "./cart.action";

export const GET_PURCHASES = 'GET_PURCHASES';
export const getPurcharse = (userId) => async (dispatch) => {
    try{
        const response = await fetch(`${API_URL}usuarios/${userId}/compras.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            throw new Error(message, errorId);
        }

        const data = await response.json();

        if(data){
            const pucharses = [];
            for (const key in data) {
                const date = (new Date(data[key].date)).toLocaleString();

                pucharses.push({
                    id: key,
                    cart: data[key].cart,
                    total: data[key].total,
                    address: data[key].address,
                    paymentMethod: data[key].paymentMethod,
                    date: date
                });
            }
            pucharses.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
            
            dispatch({
                type: GET_PURCHASES,
                list: pucharses
            });  
        }

    }catch(error){
        console.error("Error en getPurchases", error);
    }
}
export const NEW_PURCHASE = 'NEW_PURCHASE';
export const newPurchase = (cart, total, address, paymentMethod, userId, navigation) => async (dispatch) => {
    if(cart.length === 0) return;
    if(!address) return;
    if(!paymentMethod) return;
    if(!total || parseFloat(total) === NaN ) return;

    if(!userId) return;


    try{
        const response = await fetch(`${API_URL}usuarios/${userId}/compras.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart,
                total,
                address,
                paymentMethod,
                date: {".sv": "timestamp"}
            })
        });
        
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo salió mal!';
            throw new Error(message, errorId);
        }

        const data = await response.json();

        if(data){
            dispatch(clearCart());
            alert("Compra realizada con éxito")
            dispatch(getPurcharse(userId));
            navigation.navigate('Home');
        }

    }catch(error){
        console.error(error);
        console.log("Error en la acción newPurchase")
    }
}