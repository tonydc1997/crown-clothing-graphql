import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import CustomButton from "../custom-button/custom-button.component";

import "./collection-item.styles.scss";

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   addItem: (item) => dispatch(addItem(item)),
// });

export default CollectionItem;
