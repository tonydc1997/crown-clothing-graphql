import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
      toggleCartHidden @client
    }
  `;
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);

  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
