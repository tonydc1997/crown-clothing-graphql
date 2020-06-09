import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
      addItemToCart(item: $item) @client
    }
  `;
  const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($item: Item!) {
      removeItemFromCart(item: $item) @client
    }
  `;
  const CLEAR_ITEM_FROM_CART = gql`
    mutation ClearItemFromCart($item: Item!) {
      clearItemFromCart(item: $item) @client
    }
  `;
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_FROM_CART);

  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => removeItemFromCart({ variables: { cartItem } })}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => addItemToCart({ variables: { cartItem } })}
        >
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div
        className="remove-button"
        onClick={() => clearItemFromCart({ variables: { cartItem } })}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
