import { gql } from "apollo-server-core";

export const RoleSchema = gql`
  input CreateRoleInput {
    name: String!
    description: String!
  }

  input UpdateRoleInput {
    id: Int
    name: String
    description: String
  }

  type Role {
    id: Int
    name: String
    description: String
    is_deleted: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    Permissions: [Permission]
    User: [User]
  }

  type Query {
    allRoles: [Role]
    roleById(id: Int!): Role
    currentRole: Role
  }

  type Mutation {
    createRole(data: CreateRoleInput!): Role
    updateRole(id: Int!, data: UpdateRoleInput!): Role
    deleteRole(id: Int!): Role
  }
`;
