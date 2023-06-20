import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';//access the state from anywhere
import {createStore,applyMiddleware,compose} from 'redux';
// import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import './index.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
const store =createStore(reducers,{},compose(applyMiddleware(thunk)))
ReactDOM.render(
    <Provider store={store}>
     {/* <GoogleOAuthProvider 
        clientId="163622025617-jfmakfo0pgddhqsfdn7cuc2hf4n4f93h.apps.googleusercontent.com"> */}
         <App />
    {/* </GoogleOAuthProvider> */}
    </Provider>
   ,document.getElementById('root'));