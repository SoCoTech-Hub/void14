import { getConfigPluginById, getConfigPlugins } from "../api/configPlugins/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  configPluginIdSchema,
  insertConfigPluginParams,
  updateConfigPluginParams,
} from "@soco/config-db/schema/configPlugins";
import { createConfigPlugin, deleteConfigPlugin, updateConfigPlugin } from "../api/configPlugins/mutations";

export const configPluginsRouter =createTRPCRouter({
  getConfigPlugins: publicProcedure.query(async () => {
    return getConfigPlugins();
  }),
  getConfigPluginById: publicProcedure.input(configPluginIdSchema).query(async ({ input }) => {
    return getConfigPluginById(input.id);
  }),
  createConfigPlugin: publicProcedure
    .input(insertConfigPluginParams)
    .mutation(async ({ input }) => {
      return createConfigPlugin(input);
    }),
  updateConfigPlugin: publicProcedure
    .input(updateConfigPluginParams)
    .mutation(async ({ input }) => {
      return updateConfigPlugin(input.id, input);
    }),
  deleteConfigPlugin: publicProcedure
    .input(configPluginIdSchema)
    .mutation(async ({ input }) => {
      return deleteConfigPlugin(input.id);
    }),
});
