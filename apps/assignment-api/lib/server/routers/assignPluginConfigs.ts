import { getAssignPluginConfigById, getAssignPluginConfigs } from "@/lib/api/assignPluginConfigs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignPluginConfigIdSchema,
  insertAssignPluginConfigParams,
  updateAssignPluginConfigParams,
} from "@/lib/db/schema/assignPluginConfigs";
import { createAssignPluginConfig, deleteAssignPluginConfig, updateAssignPluginConfig } from "@/lib/api/assignPluginConfigs/mutations";

export const assignPluginConfigsRouter = router({
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
