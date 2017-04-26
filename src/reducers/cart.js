/**
 * Created by osetskiy on 4/6/2017.
 */
import {
    CHOOSE_PRODUCT,ADD_TO_CART,CLOSE_SNACK_BAR
} from '../actions/cart';

const pushToCart = (cart,cartItem) => {
    let findedCartItem = cart.find((element)=> {
        return element.size===cartItem.size
    })
    if(findedCartItem) {
        findedCartItem.qty++;
    } else  {
        cart.push({prodId:cartItem.prodId,size:cartItem.size,qty:1,price:cartItem.price,name:cartItem.name});
    }


}


const addToCart = (state) =>{
    let cart = getCartContentFromStorage();
    let tmpProd = state.choossedProduct
    let prodId = tmpProd.productId;
    let size   = tmpProd.size;
    let price   = tmpProd.price;
    if(prodId!=""&&(size!="")) {
        pushToCart(cart,{prodId:prodId,size:size,price:price,name:tmpProd.name});
        localStorage.setItem('cart',JSON.stringify(cart));

    }
    return cart;
}

const checkIfSizeChoosed = (state) => {
    let prodId = state.choossedProduct.productId;
    let size   = state.choossedProduct.size;
    if(prodId!=""&&(size!="")) return true;
    return false;
}
const choosedProduct = (state={productId: "", size: "",price:"",name:""},action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart:addToCart(state)
            }
        case CHOOSE_PRODUCT:
            return {
                ...state,
                productId: action.productId,
                size: action.size,
                price : action.price

            }
        default:
            return state
    }

}
const getCartContentFromStorage = () => {
    let cart = localStorage.getItem('cart');
    let cartContent = JSON.parse(cart);
    if(cartContent) return cartContent;
    return [];
}

export const cart = (state = {snackBarOpen:false,cartContent: getCartContentFromStorage(), choossedProduct: {productId: "", size: "",price:"",name}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                snackBarOpen :checkIfSizeChoosed(state),
                cartContent:addToCart(state)
            }
        case CHOOSE_PRODUCT:
            return {
                ...
                    state,
                choossedProduct:choosedProduct(state.choossedProduct,action)
            }
        case CLOSE_SNACK_BAR:
            return {
                ...state,
                snackBarOpen :false,
            }
        default:
            return state
    }

}