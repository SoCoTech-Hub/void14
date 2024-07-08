import { getInmailResponseById, getInmailResponses } from "../api/inmailResponses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  inmailResponseIdSchema,
  insertInmailResponseParams,
  updateInmailResponseParams,
} from "@soco/inmail-db/schema/inmailResponses";
import { createInmailResponse, deleteInmailResponse, updateInmailResponse } from "../api/inmailResponses/mutations";

export const inmailResponsesRouter =createTRPCRouter({
  getInmailResponses: publicProcedure.query(async () => {
    return getInmailResponses();
  }),
  getInmailResponseById: publicProcedure.input(inmailResponseIdSchema).query(async ({ input }) => {
    return getInmailResponseById(input.id);
  }),
  createInmailResponse: publicProcedure
    .input(insertInmailResponseParams)
    .mutation(async ({ input }) => {
      return createInmailResponse(input);
    }),
  updateInmailResponse: publicProcedure
    .input(updateInmailResponseParams)
    .mutation(async ({ input }) => {
      return updateInmailResponse(input.id, input);
    }),
  deleteInmailResponse: publicProcedure
    .input(inmailResponseIdSchema)
    .mutation(async ({ input }) => {
      return deleteInmailResponse(input.id);
    }),
});
