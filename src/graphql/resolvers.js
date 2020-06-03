import { gql } from "apollo-boost";

export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: () => {},
  },
};
