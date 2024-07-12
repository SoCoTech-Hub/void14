import {
  insertToolDataprivacyCtxExpiredParams,
  toolDataprivacyCtxExpiredIdSchema,
  updateToolDataprivacyCtxExpiredParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxExpireds";

import {
  createToolDataprivacyCtxExpired,
  deleteToolDataprivacyCtxExpired,
  updateToolDataprivacyCtxExpired,
} from "../api/toolDataprivacyCtxExpireds/mutations";
import {
  getToolDataprivacyCtxExpiredById,
  getToolDataprivacyCtxExpireds,
} from "../api/toolDataprivacyCtxExpireds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolDataprivacyCtxExpiredsRouter = createTRPCRouter({
  getToolDataprivacyCtxExpireds: publicProcedure.query(async () => {
    return getToolDataprivacyCtxExpireds();
  }),
  getToolDataprivacyCtxExpiredById: publicProcedure
    .input(toolDataprivacyCtxExpiredIdSchema)
    .query(async ({ input }) => {
      return getToolDataprivacyCtxExpiredById(input.id);
    }),
  createToolDataprivacyCtxExpired: publicProcedure
    .input(insertToolDataprivacyCtxExpiredParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyCtxExpired(input);
    }),
  updateToolDataprivacyCtxExpired: publicProcedure
    .input(updateToolDataprivacyCtxExpiredParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyCtxExpired(input.id, input);
    }),
  deleteToolDataprivacyCtxExpired: publicProcedure
    .input(toolDataprivacyCtxExpiredIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyCtxExpired(input.id);
    }),
});
