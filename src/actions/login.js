/**
 * Created by osetskiy on 4/13/2017.
 */
import config from '../config';
const server = config.api.hostname + ":" + config.api.port;
export const CHANGE_LOGIN_PSWRD = 'CHANGE_LOGIN_PSWRD'
export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const RECEIVE_TOKEN = 'RECIEVE_TOKEN'
export const ACCOUNT_EXIT = 'ACCOUNT_EXIT'
import { browserHistory } from 'react-router'


export const receiveTOKEN = (json) => (
    {
        type: RECEIVE_TOKEN,
        response: json,

    }
)

export const requestTOKEN = (user) => (
    {
        type: REQUEST_TOKEN,
        user: user
    }
)

export const accountExit = () => (
    {
        type: ACCOUNT_EXIT,
    }
)

export const changeLoginPswrd = (event) => (
    {
        type: CHANGE_LOGIN_PSWRD,
        field: event.target.name,
        value: event.target.value
    }
)

export const submit = () => (dispatch, getState) => {
    let user = getState().login.user;
    dispatch(requestTOKEN(user));
    return fetch(server + `/api/login`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(response => {
             return response.json()
        })
        .then(json => {
            dispatch(receiveTOKEN(json))
            if(!json.errorMSG){
                browserHistory.push('/')
            }
        })

}