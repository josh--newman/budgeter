import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Auth, { AuthUserContext } from "./Auth";
import BudgetList from "./BudgetList";
import Budget from "./Budget";
import { FirebaseContext } from "./firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authUser = useContext(AuthUserContext);

  return (
    <Route
      {...rest}
      render={props =>
        !authUser.hasInitialised ? null : authUser.details ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

function App() {
  const [authUser, setAuthUser] = useState({
    hasInitialised: false,
    details: null
  });
  console.log(authUser);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      return authUser
        ? setAuthUser({
            hasInitialised: true,
            details: {
              displayName: authUser.displayName,
              email: authUser.email
            }
          })
        : setAuthUser({
            hasInitialised: true,
            details: null
          });
    });
    return () => listener();
  }, [firebase]);

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <PrivateRoute exact path="/" component={BudgetList} />
        <Route exact path="/auth" component={Auth} />
        <PrivateRoute path="/budget/:id" component={Budget} />
      </Router>
    </AuthUserContext.Provider>
  );
}

export default App;
