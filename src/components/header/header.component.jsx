import React from "react";
import { NavLink } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = () => {
  const GET_CLIENT_PROPERTIES = gql`
    {
      cartHidden @client
      currentUser @client
    }
  `;
  const {
    data: { cartHidden, currentUser },
  } = useQuery(GET_CLIENT_PROPERTIES);
  console.log(currentUser);

  return (
    <div className="header">
      <NavLink
        className="logo-container"
        activeClassName="selected-underline"
        exact
        to="/"
      >
        <Logo className="logo" />
      </NavLink>
      <div className="options">
        <NavLink
          className="option"
          activeClassName="selected-overline"
          to="/shop"
        >
          SHOP
        </NavLink>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <NavLink
            className="option"
            activeClassName="selected-overline"
            to="/signin"
          >
            SIGN IN
          </NavLink>
        )}
        <CartIcon />
      </div>
      {cartHidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
