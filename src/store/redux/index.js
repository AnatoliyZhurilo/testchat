import {createStore, applyMiddleware, combineReducers} from "redux";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import {createBrowserHistory} from "history";
import createSagaMiddleware from 'redux-saga'
import auth from './auth'
import chat from './chat'
import rootSaga from "../sagas";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  router: connectRouter(history),
  auth,
  chat
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
  )
))

sagaMiddleware.run(rootSaga);

export default store