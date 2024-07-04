import {
  createMessageContactRequest,
  deleteMessageContactRequest,
  updateMessageContactRequest,
} from "../api/messageContactRequests/mutations";
import {
  getMessageContactRequestById,
  getMessageContactRequests,
} from "../api/messageContactRequests/queries";
import {
  insertMessageContactRequestParams,
  messageContactRequestIdSchema,
  updateMessageContactRequestParams,
} from "../db/schema/messageContactRequests";
import { publicProcedure, router } from "../server/trpc";

export const messageContactRequestsRouter = router({
  getMessageContactRequests: publicProcedure.query(async () => {
    return getMessageContactRequests();
  }),
  getMessageContactRequestById: publicProcedure
    .input(messageContactRequestIdSchema)
    .query(async ({ input }) => {
      return getMessageContactRequestById(input.id);
    }),
  createMessageContactRequest: publicProcedure
    .input(insertMessageContactRequestParams)
    .mutation(async ({ input }) => {
      return createMessageContactRequest(input);
    }),
  updateMessageContactRequest: publicProcedure
    .input(updateMessageContactRequestParams)
    .mutation(async ({ input }) => {
      return updateMessageContactRequest(input.id, input);
    }),
  deleteMessageContactRequest: publicProcedure
    .input(messageContactRequestIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageContactRequest(input.id);
    }),
});
