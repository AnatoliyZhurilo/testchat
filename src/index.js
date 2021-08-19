import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';
import App from './App';
import store from "./store/redux";
import {Provider} from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root')
);