import {
  createToolDataprivacyRequest,
  deleteToolDataprivacyRequest,
  updateToolDataprivacyRequest,
} from "../api/toolDataprivacyRequests/mutations";
import {
  getToolDataprivacyRequestById,
  getToolDataprivacyRequests,
} from "../api/toolDataprivacyRequests/queries";
import {
  insertToolDataprivacyRequestParams,
  toolDataprivacyRequestIdSchema,
  updateToolDataprivacyRequestParams,
} from "../db/schema/toolDataprivacyRequests";
import { publicProcedure, router } from "../server/trpc";

export const toolDataprivacyRequestsRouter = router({
  getToolDataprivacyRequests: publicProcedure.query(async () => {
    return getToolDataprivacyRequests();
  }),
  getToolDataprivacyRequestById: publicProcedure
    .input(toolDataprivacyRequestIdSchema)
    .query(async ({ input }) => {
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
