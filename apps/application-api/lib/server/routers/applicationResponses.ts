import { getApplicationResponseById, getApplicationResponses } from "@/lib/api/applicationResponses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  applicationResponseIdSchema,
  insertApplicationResponseParams,
  updateApplicationResponseParams,
} from "@/lib/db/schema/applicationResponses";
import { createApplicationResponse, deleteApplicationResponse, updateApplicationResponse } from "@/lib/api/applicationResponses/mutations";

export const applicationResponsesRouter = router({
  getApplicationResponses: publicProcedure.query(async () => {
    return getApplicationResponses();
  }),
  getApplicationResponseById: publicProcedure.input(applicationResponseIdSchema).query(async ({ input }) => {
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
