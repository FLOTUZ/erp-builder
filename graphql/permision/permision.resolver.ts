import { Permission } from "@prisma/client";
import { Args } from "graphql/common/common.types";
import { IGraphqlContext } from "../context";

export const PermissionResolver = {
  Query: {
    allPermissions: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.permission.findMany({
        ...pagination,
      });
    },
    permissionById: async (
      _: any,
      { id }: Permission,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.permission.findUnique({
        where: {
          id,
        },
      });
    },
  },

  Mutation: {
    createPermission: async (
      _: any,
      { data }: { data: Permission },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.permission.create({
        data,
      });
    },

    updatePermission: async (
      _: any,
      { id, ...data }: Permission,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.permission.update({
        where: { id },
        data,
      });
    },

    deletePermission: async (
      _: any,
      { id }: Permission,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.permission.delete({
        where: { id },
      });
    },
  },

  Permission: {
    Role: async (parent: Permission, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.permission.findUnique({
        where: { id: parent.id },
        include: { Role: true },
      });
    },
  },
};
