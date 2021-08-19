export const LOADING = 'CHAT/LOADING'
export const SET_LIST = 'CHAT/SET_LIST'
export const SET_SELECTED_CHAT = 'CHAT/SET_SELECTED_CHAT'
export const SET_MESSAGES = 'CHAT/SET_MESSAGES'
export const SEND_MESSAGE = 'CHAT/SEND_MESSAGE'

const state = {
  list: [],
  messages: {}, // {[key: number]: {"from": number, "to": number, "message": string, "timestamp": number}[]}[]
  loading: false, // false | 'friends' | 'messages'
  selectedChat: null,
}

const chat = (store = state, action) => {
  switch (action.type) {
    case SET_LIST:
      return {...store, list: action.payload}

    case SET_MESSAGES:
      return {...store, messages: {...store.messages, ...action.payload}}

    case SET_SELECTED_CHAT:
      return {...store, selectedChat: action.payload}

    case LOADING:
      return {...store, loading: action.payload}

    default:
      return store
  }
}


export default chat