import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-f7666-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) {
                throw new Error('get cart data error ')
            }
            const data = await response.json()
            return data
        };
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error ...',
                message: 'Get cart data Error'
            }));
        }
    };
};


export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending ...',
            message: 'Sending cart data'
        }));
        const sendRequest = async () => {
            const response = await fetch('https://react-http-f7666-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('send cart data error ')
            }
            const responseData = await response.json();
        };
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success ...',
                message: 'Send cart data Success'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error ...',
                message: 'Send cart data Error'
            }));
        }

    }
};