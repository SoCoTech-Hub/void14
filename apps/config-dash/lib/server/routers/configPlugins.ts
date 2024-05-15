import { getConfigPluginById, getConfigPlugins } from "@/lib/api/configPlugins/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  configPluginIdSchema,
  insertConfigPluginParams,
  updateConfigPluginParams,
} from "@/lib/db/schema/configPlugins";
import { createConfigPlugin, deleteConfigPlugin, updateConfigPlugin } from "@/lib/api/configPlugins/mutations";

export const configPluginsRouter = router({
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
