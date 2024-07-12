import {
  assignPluginConfigIdSchema,
  insertAssignPluginConfigParams,
  updateAssignPluginConfigParams,
} from "@soco/assignment-db/schema/assignPluginConfigs";

import {
  createAssignPluginConfig,
  deleteAssignPluginConfig,
  updateAssignPluginConfig,
} from "../api/assignPluginConfigs/mutations";
import {
  getAssignPluginConfigById,
  getAssignPluginConfigs,
} from "../api/assignPluginConfigs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignPluginConfigsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAssignPluginConfigs: publicProcedure.query(async () => {
      return getAssignPluginConfigs();
    }),
    getAssignPluginConfigById: publicProcedure
      .input(assignPluginConfigIdSchema)
      .query(async ({ input }) => {
        return getAssignPluginConfigById(input.id);
      }),
    createAssignPluginConfig: publicProcedure
      .input(insertAssignPluginConfigParams)
      .mutation(async ({ input }) => {
        return createAssignPluginConfig(input);
      }),
    updateAssignPluginConfig: publicProcedure
      .input(updateAssignPluginConfigParams)
      .mutation(async ({ input }) => {
        return updateAssignPluginConfig(input.id, input);
      }),
    deleteAssignPluginConfig: publicProcedure
      .input(assignPluginConfigIdSchema)
      .mutation(async ({ input }) => {
        return deleteAssignPluginConfig(input.id);
      }),
  });
