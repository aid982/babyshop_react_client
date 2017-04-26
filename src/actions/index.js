/**
 * Created by osetskiy on 4/4/2017.
 */
import config from '../config';
const server = config.api.hostname + ":" + config.api.port;
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const INVALIDATE_DATA = 'INVALIDATE_DATA'
export const FILTER_UPDATE = 'FILTER_UPDATE'
export const FILTERED_PRODUCTS_UPDATE = 'FILTERED_PRODUCTS_UPDATE'
export const CURRENT_PAGE_UPDATE = 'CURRENT_PAGE_UPDATE'
export const PAGINATION_UPDATE = 'PAGINATION_UPDATE'
export const DRAWER_CHANGE = 'DRAWER_CHANGE'


export const updateCurrentPage = (direction) => (
    {
        type: CURRENT_PAGE_UPDATE,
        typeOfData: direction,
    }
)

export const drawerChange = () => (
    {
        type: DRAWER_CHANGE
    }
)

export const updatePagination = () => (
    {
        type: PAGINATION_UPDATE,
    }
)


export const updateFilter = (elementId, checked, typeOfFilter) => (
    {
        type: FILTER_UPDATE,
        typeOfData: typeOfFilter,
        id: elementId,
        checked: checked
    }
)
const updateProductList = (state) => (
    {
        type: FILTERED_PRODUCTS_UPDATE
    }

)
export const updateFilterAndProductList = (elementId, checked, typeOfFilter) => (dispatch, getState) => {
    dispatch(updateFilter(elementId, checked, typeOfFilter))
    dispatch(updateProductList())
    dispatch(updatePagination(''))
}


const addChecked = (json, typeOfData) => {
    if (typeOfData === 'sizes'||typeOfData === 'categories') {
        json.map((element) => {
            element.checked = false
        });
    }


    return json;

}
export const requestData = typeOfData => ({
    type: REQUEST_DATA,
    typeOfData
})

export const receiveData = (typeOfData, json) => ({
    type: RECEIVE_DATA,
    typeOfData,
    data: addChecked(json, typeOfData),
    receivedAt: Date.now()
})

const fetchData = typeOfData => dispatch => {
    dispatch(requestData(typeOfData))
    return fetch(server + `/api/${typeOfData}`)
        .then(response => response.json())
        .then(json => dispatch(receiveData(typeOfData, json)))
}

const shouldFetchData = (state, typeOfData) => {
    const data = state.dataFromAPI[typeOfData]
    if (data.items.length === 0) {
        return true
    }
    if (data.isFetching) {
        return false
    }
    return data.didInvalidate
}

export const fetchDataIfNeeded = typeOfData => (dispatch, getState) => {
    if (shouldFetchData(getState(), typeOfData)) {
        return dispatch(fetchData(typeOfData))
    }
}
