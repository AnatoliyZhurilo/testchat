import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useLocation, useParams} from "react-router";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT} from "../store/redux/auth";
import {SEND_MESSAGE} from "../store/redux/chat";

const Chat = () => {
  const {chat: {list: friends, loading, selectedChat, messages}, auth: {userId}} = useSelector(state => state)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const chatRef = useRef()

  const sendMessage = () => {
    dispatch({type: SEND_MESSAGE, payload: {from: userId, to: selectedChat, message}})
    setMessage('')
  }

  useEffect(() => {
    debugger
    if (!chatRef.current) return;
    const {children} = chatRef.current
    if (!children) return
    children[children.length - 1]?.scrollIntoView()

  }, [messages,loading ])

  return (
    <>
      <NavLink to="/login" onClick={() => dispatch({type: LOGOUT})}>logout</NavLink>
      <div style={{display: 'flex', justifyContent: "space-between"}}>
        <div style={{
          width: 'calc(10% - 5px)',
          border: '1px solid black',
          height: '90vh',
          display: "flex",
          flexDirection: "column",
          boxSizing: 'border-box'
        }}>
          {loading === 'friends' ? 'loading' : friends.map(friend => (
            <NavLink to={`/chat/${friend.id}`} key={friend.id}>{friend.name}</NavLink>
          ))}
        </div>
        <div style={{width: 'calc(90% - 5px)', border: '1px solid black', height: '90vh'}}>
          <p style={{height: '10%', margin: 0}}>{selectedChat && friends.find(({id}) => id === +selectedChat)?.name}</p>
           <div style={{height: '80%'}}>
            {loading === 'chat' ? 'LOADING' :
              <ul style={{padding: '0 10px', listStyle: "none", height: '100%', margin: 0, overflow: "auto"}} ref={chatRef}>
                {(selectedChat && messages[selectedChat]) ? messages[selectedChat].map(m =>
                  <li key={m.timestamp}
                      style={{width: '100%', display: 'flex', justifyContent: +m.from === +userId ? 'flex-end' : 'flex-start'}}>
                    <p style={{maxWidth: '60%', border: '1px solid black', borderRadius: '5px', padding: '5px'}}>
                      {m.message.message}
                    </p>
                  </li>
                ) : 'loading'}
              </ul>
            }
          </div>
          <div style={{display: "flex", height: '10%'}}>
            <textarea style={{width: 'calc(100% - 50px)',}} value={message}
                      onChange={(e) => setMessage(e.target.value)}/>
            <button style={{width: '50px'}} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;