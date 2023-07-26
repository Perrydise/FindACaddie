import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoleBasedRoute = ({ component: Component, allowedRoles, currentUserRole, ...rest }) => {
  const isAuthorized = allowedRoles.includes(currentUserRole);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <Redirect to="/unauthorized" />
      }
    />
  );
};

export default RoleBasedRoute;
