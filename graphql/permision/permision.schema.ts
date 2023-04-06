import { gql } from "apollo-server-core";

export const PermissionSchema = gql`
  input CreatePermissionInput {
    name: String!
    description: String
    roleId: Int!
  }

  input UpdatePermissionInput {
    name: String
    description: String
    roleId: Int
  }

  type Permission {
    id: Int
    name: String
    description: String
    Role: Role
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allPermissions(pagination: Pagination): [Permission]
    permissionById(id: Int!): Permission
  }

  type Mutation {
    createPermission(data: CreatePermissionInput): Permission
    updatePermission(id: Int!, data: UpdatePermissionInput): Permission
    deletePermission(id: Int!): Permission
  }
`;
