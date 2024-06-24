import { getToolDataprivacyRequestById, getToolDataprivacyRequests } from "@/lib/api/toolDataprivacyRequests/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyRequestIdSchema,
  insertToolDataprivacyRequestParams,
  updateToolDataprivacyRequestParams,
} from "@/lib/db/schema/toolDataprivacyRequests";
import { createToolDataprivacyRequest, deleteToolDataprivacyRequest, updateToolDataprivacyRequest } from "@/lib/api/toolDataprivacyRequests/mutations";

export const toolDataprivacyRequestsRouter = router({
  getToolDataprivacyRequests: publicProcedure.query(async () => {
    return getToolDataprivacyRequests();
  }),
  getToolDataprivacyRequestById: publicProcedure.input(toolDataprivacyRequestIdSchema).query(async ({ input }) => {
    return getToolDataprivacyRequestById(input.id);
  }),
  createToolDataprivacyRequest: publicProcedure
    .input(insertToolDataprivacyRequestParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyRequest(input);
    }),
  updateToolDataprivacyRequest: publicProcedure
    .input(updateToolDataprivacyRequestParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyRequest(input.id, input);
    }),
  deleteToolDataprivacyRequest: publicProcedure
    .input(toolDataprivacyRequestIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyRequest(input.id);
    }),
});
