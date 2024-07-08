import { getAssignPluginConfigById, getAssignPluginConfigs } from "../api/assignPluginConfigs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  assignPluginConfigIdSchema,
  insertAssignPluginConfigParams,
  updateAssignPluginConfigParams,
} from "@soco/assignment-db/schema/assignPluginConfigs";
import { createAssignPluginConfig, deleteAssignPluginConfig, updateAssignPluginConfig } from "../api/assignPluginConfigs/mutations";

export const assignPluginConfigsRouter =createTRPCRouter({
  getAssignPluginConfigs: publicProcedure.query(async () => {
    return getAssignPluginConfigs();
  }),
  getAssignPluginConfigById: publicProcedure.input(assignPluginConfigIdSchema).query(async ({ input }) => {
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
