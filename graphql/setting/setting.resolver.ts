import { Setting } from "@prisma/client";
import { IGraphqlContext } from "../context";
import { Args } from "graphql/common/common.types";

export const SettingsResolver = {
  Query: {

    allSettings: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.setting.findMany({
        ...pagination,
      });
    },

    settingById: async (
      _: any,
      { id }: Setting,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.setting.findUnique({
        where: {
          id,
        },
      });
    },

    settingByName: async (
      _: any,
      { name }: Setting,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.setting.findUnique({
        where: {
          name,
        },
      });
    },
  },
  Mutation: {
    createSetting: async (
      _: any,
      { data }: { data: Setting },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.setting.create({
        data,
      });
    },

    updateSetting: async (
      _: any,
      { id, ...data }: Setting,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.setting.update({
        where: { id },
        data,
      });
      return response;
    },

    deleteSetting: async (
      _: any,
      { id }: Setting,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.setting.delete({
        where: { id },
      });
      return response;
    },

    updateManySettings: async (
      _: any,
      { data }: { data: Setting[] },
      { prisma }: IGraphqlContext
    ) => {
      data.map(async (item) => {
        await prisma.setting.update({
          where: { name: item.name },
          data: {
            value: item.value,
          },
        });
      });
      return await prisma.setting.findMany();
    },
  },
};
