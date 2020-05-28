import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionByTitle($title: String!) {
    getCollectionByTitle(title: $title) {
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
