import { User } from "@prisma/client";
import { Args } from "graphql/common/common.types";
import { IGraphqlContext } from "../context";

import bcrypt from "bcrypt";

export const UserResolver = {
  Query: {
    allUsers: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.user.findMany({
        ...pagination,
      });
    },
    userById: async (_: any, { id }: User, { prisma }: IGraphqlContext) => {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },

    currentUser: async (
      _: any,
      __: User,
      { prisma, idUser }: IGraphqlContext
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          id: idUser!,
        },
      });

      return user;
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: User },

      { prisma }: IGraphqlContext
    ) => {
      return await prisma.user.create({
        data,
      });
    },

    updateUser: async (
      _: any,
      { id, data }: { id: number; data: User },
      { prisma }: IGraphqlContext
    ) => {
      if (data.password) {
        // Generate salt
        const salt = await bcrypt.genSalt();

        // Hash password
        const encryptedPassword = await bcrypt.hash(data.password, salt);

        const response = await prisma.user.update({
          where: { id },
          data: {
            ...data,
            password: encryptedPassword,
          },
        });

        return response;
      }
      const response = await prisma.user.update({
        where: { id },
        data,
      });

      return response;
    },
    deleteUser: async (_: any, { id }: User, { prisma }: IGraphqlContext) => {
      const response = await prisma.user.delete({
        where: { id },
      });

      return response;
    },
  },

  User: {
    Role: async (parent: User, _: any, { prisma }: IGraphqlContext) => {
      if (!parent.roleId) return null;

      return await prisma.role.findUnique({
        where: {
          id: parent.roleId,
        },
      });
    },
  },
};
