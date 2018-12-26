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
import imageinputReducer from './reducers/imageinputReducer';
import profilepictureReducer from './reducers/profilepictureReducer';
import followkeyReducer from './reducers/followkeyReducer';
import followkeynameReducer from './reducers/followkeynameReducer';
import followkeypicReducer from './reducers/followkeypicReducer';
import postReducer from './reducers/postReducer';
import follownewsfeedReducer from './reducers/follownewsfeedReducer';
import postnameReducer from './reducers/postnameReducer';
import postpicReducer from './reducers/postpicReducer';
import mynewfeedheightReducer from './reducers/mynewfeedheightReducer';
import postheightReducer from './reducers/postheightReducer';
import follownewsfeedheightReducer from './reducers/follownewsfeedheightReducer';
import follownewsfeedkeyReducer from './reducers/follownewsfeedkeyReducer';
import postkeyReducer from './reducers/postkeyReducer';
import readytologinReducer from './reducers/readytologinReducer';
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
    imageinput: imageinputReducer,
    profilepicture: profilepictureReducer,
    followkey: followkeyReducer,
    followkeyname: followkeynameReducer,
    followkeypic: followkeypicReducer,
    post: postReducer,
    follownewsfeed: follownewsfeedReducer,
    postname: postnameReducer,
    postpic: postpicReducer,
    mynewfeedheight : mynewfeedheightReducer,
    postheight: postheightReducer,
    follownewsfeedheight: follownewsfeedheightReducer,
    follownewsfeedkey: follownewsfeedkeyReducer,
    postkey: postkeyReducer,
    readytologin: readytologinReducer,
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
