import {Redirect, Route, Switch} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import Auth from "./containers/auth";
import {history} from "./store/redux";
import {useSelector} from "react-redux";
import {RestrictedRoute} from "./components/restrictedRoute";
import Chat from "./containers/chat.js";
import React from "react";

const App = () => {
  const userId = useSelector(state => state.auth.userId)

  return (
    <div className="App">
      app
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact>
            {
              userId ? <Redirect
                to={{
                  pathname: '/chat'
                }}
              /> : <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            }
          </Route>

          <Route path="/login" exact>
            <Auth />
          </Route>
          <RestrictedRoute access={userId} exact path="/chat/:userId" component={Chat}/>
          <RestrictedRoute access={userId} path="/chat" component={Chat}/>
          <Route path="*" exact>
            {
              userId ? <Redirect
                to={{
                  pathname: '/chat'
                }}
              /> : <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            }
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
