import {Role, User} from "@prisma/client";
import { Args } from "graphql/common/common.types";

import { IGraphqlContext } from "../context";

export const RoleResolver = {
  Query: {
    allRoles: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.role.findMany({
        ...pagination,
      });
    },

    roleById: async (
        _: any,
        { id }: { id: number },
        { prisma }: IGraphqlContext
        ) => {
        return await prisma.role.findUnique({
            where: {
                id,
            },
        });
    },

    currentRole: async (
      _: any,
      __: any,
      { prisma, idUser }: IGraphqlContext
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          id: idUser!,
        },
      });

      return await prisma.role.findUnique({
        where: {
          id: user?.roleId!,
        },
        include: {
          Permissions: true,
        },
      });
    },
  },

  Mutation: {
    createRole: async (
      _: any,
      { data }: { data: Role },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.role.create({
        data,
      });
    },

    updateRole: async (
      _: any,
      { id, data }: { id: number; data: Role },
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.role.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteRole: async (_: any, { id }: Role, { prisma }: IGraphqlContext) => {
      const response = await prisma.role.delete({
        where: { id },
      });
      return response;
    },
  },

  Role: {
    User: async (parent: Role, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.role
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .User();
    },
    Permissions: async (parent: Role, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.role
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .Permissions();
    },
  },
};
