import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import coverImageReducer from './reducers/coverimage-reducer';
import tabReducer from './reducers/tab-reducer';
import dialogReducer from './reducers/dialog-reducer';
import commentReducer from './reducers/commentReducer';
import componentReducer from './reducers/component-reducer';
import sckeyReducer from './reducers/sckeyReducer';
import profileReducer from './reducers/profileReducer';
import mynewfeedReducer from './reducers/mynewfeedReducer';
import pbkeyReducer from './reducers/pbkeyReducer';
import dialog2Reducer from './reducers/dialog2-reducer';
import paymenthistoryReducer from './reducers/paymenthistoryReducer';
import paymentuserReducer from './reducers/paymentuserReducer';
import paymentuserlistReducer from './reducers/paymentuserlistReducer';
import transfersReducer from './reducers/transfersReducer';
const rootReducer = combineReducers({
    coverImage: coverImageReducer,
    tab: tabReducer,
    dialog: dialogReducer,
    dialog2: dialog2Reducer,
    comment: commentReducer,
    component: componentReducer,
    sckey: sckeyReducer,
    profile: profileReducer,
    mynewfeed: mynewfeedReducer,
    pbkey: pbkeyReducer,
    paymenthistory: paymenthistoryReducer,
    paymentuser: paymentuserReducer,
    paymentuserlist: paymentuserlistReducer,
    transfers: transfersReducer,
  })

// Create store with reducers

const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}>
    <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
