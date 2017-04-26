/**
 * Created by osetskiy on 4/12/2017.
 */
export const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR'

export const chooseProduct = (productID,size,price,name) => (
    {
        type: CHOOSE_PRODUCT,
        productId: productID,
        size:size,
        price:price
    }
)


export const addToCart = () => (
    {
        type: ADD_TO_CART
    }
)


export const closeSnackBar = () => (
    {
        type: CLOSE_SNACK_BAR
    }
)
