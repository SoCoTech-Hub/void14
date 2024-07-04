import {
  createApplicationResponse,
  deleteApplicationResponse,
  updateApplicationResponse,
} from "../api/applicationResponses/mutations";
import {
  getApplicationResponseById,
  getApplicationResponses,
} from "../api/applicationResponses/queries";
import {
  applicationResponseIdSchema,
  insertApplicationResponseParams,
  updateApplicationResponseParams,
} from "../db/schema/applicationResponses";
import { publicProcedure, router } from "../server/trpc";

export const applicationResponsesRouter = router({
  getApplicationResponses: publicProcedure.query(async () => {
    return getApplicationResponses();
  }),
  getApplicationResponseById: publicProcedure
    .input(applicationResponseIdSchema)
    .query(async ({ input }) => {
      return getApplicationResponseById(input.id);
    }),
  createApplicationResponse: publicProcedure
    .input(insertApplicationResponseParams)
    .mutation(async ({ input }) => {
      return createApplicationResponse(input);
    }),
  updateApplicationResponse: publicProcedure
    .input(updateApplicationResponseParams)
    .mutation(async ({ input }) => {
      return updateApplicationResponse(input.id, input);
    }),
  deleteApplicationResponse: publicProcedure
    .input(applicationResponseIdSchema)
    .mutation(async ({ input }) => {
      return deleteApplicationResponse(input.id);
    }),
});
