import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

import "./App.css";

import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const App = () => {
  const SET_CURRENT_USER = gql`
    mutation SetCurrentUser($user: User!) {
      setCurrentUser(user: $user) @client
    }
  `;
  const GET_CURRENT_USER = gql`
    {
      currentUser @client
    }
  `;
  const { currentUser } = useQuery(GET_CURRENT_USER);
  const [setCurrentUser] = useMutation(SET_CURRENT_USER);

  useEffect(() => {
    return auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser({ variables: { user: userAuth } });
    });
  }, [setCurrentUser]);
  console.log(currentUser);

  // unsubscribeFromAuth = null;

  // componentDidMount() {
  //   const { setCurrentUser } = this.props;

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot((snapShot) => {
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data(),
  //         });
  //       });
  //     }

  //     setCurrentUser(userAuth);
  //   });
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default App;
