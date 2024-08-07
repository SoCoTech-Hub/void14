import {
  configIdSchema,
  insertConfigParams,
  updateConfigParams,
} from "@soco/config-db/schema/configs";

import {
  createConfig,
  deleteConfig,
  updateConfig,
} from "../api/configs/mutations";
import { getConfigById, getConfigs } from "../api/configs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const configsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getConfigs: publicProcedure.query(async () => {
      return getConfigs();
    }),
    getConfigById: publicProcedure
      .input(configIdSchema)
      .query(async ({ input }) => {
        return getConfigById(input.id);
      }),
    createConfig: publicProcedure
      .input(insertConfigParams)
      .mutation(async ({ input }) => {
        return createConfig(input);
      }),
    updateConfig: publicProcedure
      .input(updateConfigParams)
      .mutation(async ({ input }) => {
        return updateConfig(input.id, input);
      }),
    deleteConfig: publicProcedure
      .input(configIdSchema)
      .mutation(async ({ input }) => {
        return deleteConfig(input.id);
      }),
  });
