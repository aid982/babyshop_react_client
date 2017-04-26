/**
 * Created by osetskiy on 4/13/2017.
 */
import {
    CHANGE_LOGIN_PSWRD, RECEIVE_TOKEN,ACCOUNT_EXIT
} from '../actions/login';


const changeUser = (state = {email: "", password: ""}, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_PSWRD:
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state
    }
}
const getAccountFromStorage = () => {
    let account = localStorage.getItem('account');
    try {
        account = JSON.parse(account);
    } catch (Err) {
        account = undefined
    }

    return account;
}

const saveAccountToStorage = (response) => {
    localStorage.setItem('account', JSON.stringify(response.account));
    return response.account;
}

const updateErrors = (state = {summary: "", email: "", password: ""}, action) => {
    switch (action.type) {
        case RECEIVE_TOKEN:
            return {
                ...state,
                summary: (action.response.errorMSG)

            }
        default:
            return state
    }


}

export const login = (state = {account: getAccountFromStorage(),user:{email:"",password:""}, errors: {}}, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_PSWRD:
            return {
                ...state,
                user: changeUser(state.user, action)

            }
        case RECEIVE_TOKEN:
            return {
                ...state,
                errors: updateErrors(state.errors, action),
                account: saveAccountToStorage(action.response)

            }

        case ACCOUNT_EXIT:
            return {
                account: saveAccountToStorage({})
            }
        default:
            return state
    }
}

