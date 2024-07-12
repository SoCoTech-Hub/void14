import {
  insertToolDataprivacyRequestParams,
  toolDataprivacyRequestIdSchema,
  updateToolDataprivacyRequestParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyRequests";

import {
  createToolDataprivacyRequest,
  deleteToolDataprivacyRequest,
  updateToolDataprivacyRequest,
} from "../api/toolDataprivacyRequests/mutations";
import {
  getToolDataprivacyRequestById,
  getToolDataprivacyRequests,
} from "../api/toolDataprivacyRequests/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolDataprivacyRequestsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
