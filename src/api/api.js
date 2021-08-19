import store from "../store/redux";

const apiUrl = 'https://lingio-recruit-server.herokuapp.com/'
const combineApi = (path) => `${apiUrl}${path}`

export const getAvailableAccounts = async () => {
  try {
    const {accounts} = await fetch(combineApi('accounts')).then(r => r.json());
    return accounts
  } catch (e) {
    console.error(e)
  }
  return []
}

export const getFriends = async (myId) => {
  try {
    const {accounts} = await fetch(combineApi('accounts')).then(r => r.json());
    return accounts.filter(({id}) => id !== myId)
  } catch (e) {
    console.error(e)
  }
  return []
}

export const getMessages = async (from, to) => {
  try {
    const {messages: fromMe} = await fetch(combineApi(`conversations/from/${from}/to/${to}`)).then(r => r.json());
    const {messages: toMe} = await fetch(combineApi(`conversations/from/${to}/to/${from}`)).then(r => r.json());
    const toReturn = [...fromMe, ...toMe].sort((a, b) => a.timestamp - b.timestamp)

    return toReturn
  } catch (e) {
    console.error(e)
  }
  return []
}

export const sendMessage = async ({from, to, message}) => {
  try {
    return await fetch(combineApi(`conversations/from/${from}/to/${to}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: {
        message
      }})
    }).then(r => r.json());
  } catch (e) {
    console.error(e)
  }
  return []
}