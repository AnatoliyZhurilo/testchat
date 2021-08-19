export const LOGIN = 'AUTH/LOGIN'
export const LOGOUT = 'AUTH/LOGOUT'
export const LOADING = 'AUTH/LOADING'
export const SET_POSSIBLE_USERS = 'AUTH/SET_POSSIBLE_USERS'

const state = {
  userId: null,
  possibleUsersToLogin: [],
  loading: false,
}

const auth = (store = state, action) => {
  switch (action.type) {
    case SET_POSSIBLE_USERS:
      return {...store, possibleUsersToLogin: action.payload}

    case LOADING:
      return {...store, loading: action.payload}

    case LOGIN:
      return {...store, userId: action.payload}
    case LOGOUT:
      return {...store, userId: null}

    default:
      return store
  }
}


export default auth