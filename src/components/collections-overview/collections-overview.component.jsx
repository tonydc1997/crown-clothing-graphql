import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import CollectionPreview from "../collection-preview/collection-preview.component";
import Spinner from "../spinner/spinner.component";

import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => {
  const GET_COLLECTIONS = gql`
    {
      collections {
        id
        title
        items {
          id
          name
          price
          imageUrl
        }
      }
    }
  `;

  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
