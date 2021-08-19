import {take, call, put, apply, select, fork} from "redux-saga/effects";
import {eventChannel, END} from "redux-saga";
import {LOCATION_CHANGE} from "connected-react-router";
import {getAvailableAccounts, getFriends, getMessages} from "../../api/api";
import {LOADING as AUTH_LOADING, SET_POSSIBLE_USERS} from "../redux/auth";
import {LOADING as CHAT_LOADING, SET_LIST, SET_MESSAGES, SET_SELECTED_CHAT} from "../redux/chat";

function*loginOpenedWorker() {
  yield put({type: AUTH_LOADING, payload: true})
  const response = yield getAvailableAccounts();
  yield put({type: SET_POSSIBLE_USERS, payload: response})
  yield put({type: AUTH_LOADING, payload: false})
}

function*friendsOpenedWorker() {
  yield put({type: CHAT_LOADING, payload: 'friends'})
  const myId = yield select(state => state.auth.userId)
  const response = yield getFriends(myId);
  yield put({type: SET_LIST, payload: response})
  yield put({type: CHAT_LOADING, payload: null})
}

function getMessagesInterval(myId, id) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        getMessages(myId, id).then((messages) => {
          emitter(messages)
        })
      }, 5000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}

export function*getMessagesWorker(id) {
  yield put({type: CHAT_LOADING, payload: 'chat'})

  const myId = yield select(state => state.auth.userId)
  const response = yield getMessages(myId, id);
  console.log(myId, id);
  yield put({type: SET_MESSAGES, payload: {[id]: response}})
  yield put({type: CHAT_LOADING, payload: null})
  return
}

function*checkForFurtherMessagesWorker(id) {
  const myId = yield select(state => state.auth.userId)

  const chan = yield call(getMessagesInterval, myId, id)
  try {
    while (true) {
      const selectedChat = yield select(state => state.chat.selectedChat)
      if (selectedChat !== id) {
        chan.close();
        return
      }
      let messages = yield take(chan)
      yield put({type: SET_MESSAGES, payload: {[id]: messages}})
    }
  } finally {
    console.log('countdown terminated')
  }
}

export default function* locationWatcher() {
  while (true) {
    const action = yield take(LOCATION_CHANGE)
    if (action.payload.location.pathname.endsWith('login')) {
      yield call(loginOpenedWorker)
    } else if (action.payload.location.pathname.endsWith('/chat')) {
      yield call(friendsOpenedWorker)
    } else if (action.payload.location.pathname.match(/chat\/\d+$/)) {
      const id = action.payload.location.pathname.slice(-1)
      console.log(id);
      yield put({type: SET_SELECTED_CHAT, payload: id})
      yield fork(getMessagesWorker, id)
      yield fork(checkForFurtherMessagesWorker, id)
    }

  }
}