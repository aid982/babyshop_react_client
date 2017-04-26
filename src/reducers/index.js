/**
 * Created by osetskiy on 4/4/2017.
 */

import {combineReducers} from 'redux'
import {
    REQUEST_DATA,
    RECEIVE_DATA,
    INVALIDATE_DATA,
    FILTER_UPDATE,
    FILTERED_PRODUCTS_UPDATE,
    PAGINATION_UPDATE,
    CURRENT_PAGE_UPDATE,
    DRAWER_CHANGE
} from '../actions';
import {cart} from './cart'
import {login} from './login'
import config from '../config';

const numberOfElementsPerPage = config.numberOfElementsPerPage;

const emptyData = {
    isFetching: false,
    didInvalidate: false,
    items: []
};


const changeChecked = (dataArray, action) => {
    let newArray = dataArray.slice();
    newArray.map((data) => {
        if (data._id === action.id) {
            data.checked = action.checked
        }
        ;
    });

    return newArray;
}


const data = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_DATA:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_DATA:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.data,
                lastUpdated: action.receivedAt
            }

        case FILTER_UPDATE:
            return {
                ...state,
                items: changeChecked(state.items, action)
            }
        default:
            return state
    }
}

const contains = (arrayFilter, array, forProducts) => {
    if (!array && arrayFilter.length > 0) {
        return false
    }
    if (arrayFilter.length === 0) {
        return true
    }

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arrayFilter.length; j++) {
            if (forProducts) {
                if (array[i].size === arrayFilter[j].name) {
                    return true;
                }

            } else {
                if (array[i]._id === arrayFilter[j]._id) {
                    return true;
                }
            }
        }
    }

    return false


}


const updateFilteredProducts = (state) => {
    var sizes = state.sizes.items.filter((data) => {
        if (data.checked) {
            return data
        }
    });
    var categories = state.categories.items.filter((data) => {
        if (data.checked) {
            return data
        }
    });
    let newProductList = state.products.items.filter((data) => {
        // Checking categories
        if (!contains(categories, data.category, false)) {
            return false;
        }

        if (!contains(sizes, data.productItems, true)) {
            return false;
        }

        return true

    });
    return newProductList;

}

const updateCurrentPage = (state, action) => {
    let maxNumberOfPages = state.filteredProducts.length / numberOfElementsPerPage;
    if (action.typeOfData === '+') {
        if (state.currentPage < maxNumberOfPages) {
            return state.currentPage + 1
        }
    }

    if (action.typeOfData === '-') {
        if (state.currentPage > 1) {
            return state.currentPage - 1
        }
    }

    return state.currentPage;


}
const updatePagination = (filteredProducts, currentPage) => {
    return filteredProducts.slice((currentPage - 1) * numberOfElementsPerPage, (currentPage - 1) * numberOfElementsPerPage + numberOfElementsPerPage);
}


const dataFromAPI = (state = {
    products: emptyData,
    categories: emptyData,
    sizes: emptyData,
    filteredProducts: [],
    visibleProducts: [],
    currentPage: 1,
    openDrawer:false
}, action) => {
    if (action.type === RECEIVE_DATA || action.type === FILTER_UPDATE) {
        if (action.typeOfData === 'products') {
            return {
                ...state,
                'products': data(state[action.typeOfData], action),
                filteredProducts: action.data,
                visibleProducts: updatePagination(action.data, state.currentPage)
            }
        } else {
            return {
                ...state,
                [action.typeOfData]: data(state[action.typeOfData], action),
            }

        }
    } else if (action.type === FILTERED_PRODUCTS_UPDATE) {
        return {
            ...state,
            currentPage:1,
            filteredProducts: updateFilteredProducts(state, action)
        }


    } else if (action.type === CURRENT_PAGE_UPDATE) {
        return {
            ...state,
            currentPage: updateCurrentPage(state, action),
        }


    }
    else if (action.type === PAGINATION_UPDATE) {
        return {
            ...state,
            visibleProducts: updatePagination(state.filteredProducts, state.currentPage)
        }

    }
    else if (action.type === DRAWER_CHANGE) {
        return {
            ...state,
            openDrawer:!state.openDrawer
        }

    }
    else
        return state
}


const rootReducer = combineReducers({
    dataFromAPI,
    cart,
    login

})

export default rootReducer