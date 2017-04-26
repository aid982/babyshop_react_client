import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {fetchDataIfNeeded, updatePagination} from './actions'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {browserHistory, Router} from 'react-router';
import routes from './routes';
import reducer from './reducers'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'

injectTapEventPlugin();
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: cyan500,
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
    },
});

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={browserHistory} routes={routes}/>
        </MuiThemeProvider></Provider>), document.getElementById('root'));