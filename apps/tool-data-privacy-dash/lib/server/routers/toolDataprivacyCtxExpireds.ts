import { getToolDataprivacyCtxExpiredById, getToolDataprivacyCtxExpireds } from "@/lib/api/toolDataprivacyCtxExpireds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyCtxExpiredIdSchema,
  insertToolDataprivacyCtxExpiredParams,
  updateToolDataprivacyCtxExpiredParams,
} from "@/lib/db/schema/toolDataprivacyCtxExpireds";
import { createToolDataprivacyCtxExpired, deleteToolDataprivacyCtxExpired, updateToolDataprivacyCtxExpired } from "@/lib/api/toolDataprivacyCtxExpireds/mutations";

export const toolDataprivacyCtxExpiredsRouter = router({
  getToolDataprivacyCtxExpireds: publicProcedure.query(async () => {
    return getToolDataprivacyCtxExpireds();
  }),
  getToolDataprivacyCtxExpiredById: publicProcedure.input(toolDataprivacyCtxExpiredIdSchema).query(async ({ input }) => {
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
