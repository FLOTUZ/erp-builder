import { gql } from "apollo-server-core";

export const SettingSchema = gql`
  input CreateSettingInput {
    name: String!
    value: String!
  }

  type Setting {
    id: Int
    name: String!
    value: String!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    allSettings: [Setting]
    settingById(id: Int): Setting
    settingByName(name: String!): Setting
  }

  type Mutation {
    createSetting(data: CreateSettingInput): Setting
    updateSetting(id: Int, data: CreateSettingInput): Setting
    deleteSetting(id: Int): Setting
    updateManySettings(data: [CreateSettingInput]!): [Setting]
  }
`;
