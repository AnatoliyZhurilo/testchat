import React from "react";
import { Route, Redirect } from "react-router";

export const RestrictedRoute = ({component: Component , access, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (access ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {from: props.location},
        }}
      />
    ))}
  />
);