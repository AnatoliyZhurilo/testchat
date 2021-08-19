import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {LOGIN} from "../store/redux/auth";
import {Redirect} from "react-router";

const Auth = () => {
  const {possibleUsersToLogin: possibleUsers, loading, userId} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [selectedId, setSelectedId] = useState(null)

  const login = () => {
    dispatch({type:LOGIN, payload: selectedId})
  }

  if (userId) {
    return <Redirect
      to={{
        pathname: '/chat'
      }}
    />
  }

  return <div className="login">

    <h1>Login</h1>
    {
      loading ? <p>loading</p> : (
        <ul>
          {possibleUsers.map((u) =>
            <li onClick={() => setSelectedId(u.id)} key={u.id} className={classNames('login__user', {'login__user--active': selectedId === u.id})}>{u.name}</li>
          )}
        </ul>
      )
    }
    <button onClick={login}>
      login
    </button>
  </div>
};

export default Auth;