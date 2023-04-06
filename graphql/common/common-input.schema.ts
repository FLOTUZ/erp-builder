import { gql } from "apollo-server-core";

export const CommonInputSchema = gql`
  input Pagination {
    take: Int
    skip: Int
  }
`;
