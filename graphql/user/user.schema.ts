import { gql } from "apollo-server-core";

export const UserSchema = gql`
  input CreateUserInput {
    names: String!
    firstname: String!
    lastname: String!
    email: String! @constraint(format: "email")
    password: String! @constraint(minLength: 8, maxLength: 255)
    about_user: String
    roleId: Int @constraint(min: 1, uniqueTypeName: "Role id required")
  }

  input UpdateUserInput {
    names: String
    firstname: String
    lastname: String
    email: String
    password: String
    about_user: String
    is_active: Boolean
    roleId: Int
  }

  type User {
    id: Int
    names: String
    firstname: String
    lastname: String
    email: String
    about_user: String
    Role: Role
    is_active: Boolean
    is_deleted: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    roleId: Int
  }

  type Query {
    allUsers(pagination: Pagination): [User]
    userById(id: Int!): User
    currentUser: User
  }

  type Mutation {
    createUser(data: CreateUserInput): User
    updateUser(id: Int!, data: UpdateUserInput): User
    deleteUser(id: Int!): User
  }
`;
