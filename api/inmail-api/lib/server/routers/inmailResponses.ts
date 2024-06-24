import { getInmailResponseById, getInmailResponses } from "@/lib/api/inmailResponses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  inmailResponseIdSchema,
  insertInmailResponseParams,
  updateInmailResponseParams,
} from "@/lib/db/schema/inmailResponses";
import { createInmailResponse, deleteInmailResponse, updateInmailResponse } from "@/lib/api/inmailResponses/mutations";

export const inmailResponsesRouter = router({
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
