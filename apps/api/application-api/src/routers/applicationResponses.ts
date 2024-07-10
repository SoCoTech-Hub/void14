import { getApplicationResponseById, getApplicationResponses } from "../api/applicationResponses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  applicationResponseIdSchema,
  insertApplicationResponseParams,
  updateApplicationResponseParams,
} from "@soco/application-db/schema/applicationResponses";
import { createApplicationResponse, deleteApplicationResponse, updateApplicationResponse } from "../api/applicationResponses/mutations";

export const applicationResponsesRouter =createTRPCRouter({
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
