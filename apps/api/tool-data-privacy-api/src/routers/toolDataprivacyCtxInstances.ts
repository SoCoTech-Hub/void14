import {
  insertToolDataprivacyCtxInstanceParams,
  toolDataprivacyCtxInstanceIdSchema,
  updateToolDataprivacyCtxInstanceParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxInstances";

import {
  createToolDataprivacyCtxInstance,
  deleteToolDataprivacyCtxInstance,
  updateToolDataprivacyCtxInstance,
} from "../api/toolDataprivacyCtxInstances/mutations";
import {
  getToolDataprivacyCtxInstanceById,
  getToolDataprivacyCtxInstances,
} from "../api/toolDataprivacyCtxInstances/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolDataprivacyCtxInstancesRouter = createTRPCRouter({
  getToolDataprivacyCtxInstances: publicProcedure.query(async () => {
    return getToolDataprivacyCtxInstances();
  }),
  getToolDataprivacyCtxInstanceById: publicProcedure
    .input(toolDataprivacyCtxInstanceIdSchema)
    .query(async ({ input }) => {
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
