import { getToolDataprivacyCtxInstanceById, getToolDataprivacyCtxInstances } from "@/lib/api/toolDataprivacyCtxInstances/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyCtxInstanceIdSchema,
  insertToolDataprivacyCtxInstanceParams,
  updateToolDataprivacyCtxInstanceParams,
} from "@/lib/db/schema/toolDataprivacyCtxInstances";
import { createToolDataprivacyCtxInstance, deleteToolDataprivacyCtxInstance, updateToolDataprivacyCtxInstance } from "@/lib/api/toolDataprivacyCtxInstances/mutations";

export const toolDataprivacyCtxInstancesRouter = router({
  getToolDataprivacyCtxInstances: publicProcedure.query(async () => {
    return getToolDataprivacyCtxInstances();
  }),
  getToolDataprivacyCtxInstanceById: publicProcedure.input(toolDataprivacyCtxInstanceIdSchema).query(async ({ input }) => {
    return getToolDataprivacyCtxInstanceById(input.id);
  }),
  createToolDataprivacyCtxInstance: publicProcedure
    .input(insertToolDataprivacyCtxInstanceParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyCtxInstance(input);
    }),
  updateToolDataprivacyCtxInstance: publicProcedure
    .input(updateToolDataprivacyCtxInstanceParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyCtxInstance(input.id, input);
    }),
  deleteToolDataprivacyCtxInstance: publicProcedure
    .input(toolDataprivacyCtxInstanceIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyCtxInstance(input.id);
    }),
});
