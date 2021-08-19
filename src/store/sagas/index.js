import {spawn, call, all, takeLatest} from 'redux-saga/effects'
import locationWatcher, {getMessagesWorker} from "./locationSagas";
import {LOCATION_CHANGE} from "connected-react-router";
import {SEND_MESSAGE} from "../redux/chat";
import {sendMessage} from "../../api/api";

function *messagesWatcher(action) {
  const response = yield call(sendMessage, action.payload)
  console.log(action.payload);
  yield call(getMessagesWorker, action.payload.to)
}

function *chatWatcher() {
    const action = yield takeLatest(SEND_MESSAGE, messagesWatcher)
}

export default function* rootSaga() {

  const sagas = [locationWatcher, chatWatcher]

  const retrySagas = yield sagas.map(saga => {
    return spawn(function *() {
      while(true) {
        try {
          yield call(saga);
          break
        } catch (e) {
          console.error(e)
        }
      }
    })
  })

  yield all(retrySagas)

}