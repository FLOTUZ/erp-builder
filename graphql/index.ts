import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { prisma } from "services/prisma.service";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  createApolloQueryValidationPlugin,
  constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";

import { mergeTypeDefs } from "@graphql-tools/merge";

import { NextApiRequest, NextApiResponse } from "next";
import { IPayload, valiteAndRefreshToken } from "./context";

import {
  UserResolver,
  RoleResolver,
  PermissionResolver,
  SettingsResolver,
} from "./resolvers";

import {
  ScalarsSchema,
  CommonInputSchema,
  RoleSchema,
  PermissionSchema,
  SettingSchema,
  UserSchema,
} from "./schemas";

const context = ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const payload = valiteAndRefreshToken(req, res) as IPayload;

  if (payload == null) {
    return { prisma, idUser: null, role: null };
  }

  if (payload.role == undefined) {
    return { prisma, idUser: payload.id, role: null };
  }
  return {
    prisma,
    idUser: payload.id,
    role: payload.role,
  };
};

const typeDefs = mergeTypeDefs([
  constraintDirectiveTypeDefs,
  ScalarsSchema,
  CommonInputSchema,
  RoleSchema,
  PermissionSchema,
  SettingSchema,
  UserSchema,
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [UserResolver, RoleResolver, SettingsResolver, PermissionResolver],
});

const plugins = [
  ApolloServerPluginLandingPageGraphQLPlayground(),
  createApolloQueryValidationPlugin({
    schema,
  }),
];

export const apolloServer = new ApolloServer({
  schema,
  plugins,
  context: context,
  introspection: process.env.NODE_ENV !== "production",
});

export const startServer = apolloServer.start();
