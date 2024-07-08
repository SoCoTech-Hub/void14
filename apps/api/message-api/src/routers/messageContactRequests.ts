import { getMessageContactRequestById, getMessageContactRequests } from "../api/messageContactRequests/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageContactRequestIdSchema,
  insertMessageContactRequestParams,
  updateMessageContactRequestParams,
} from "@soco/message-db/schema/messageContactRequests";
import { createMessageContactRequest, deleteMessageContactRequest, updateMessageContactRequest } from "../api/messageContactRequests/mutations";

export const messageContactRequestsRouter =createTRPCRouter({
  getMessageContactRequests: publicProcedure.query(async () => {
    return getMessageContactRequests();
  }),
  getMessageContactRequestById: publicProcedure.input(messageContactRequestIdSchema).query(async ({ input }) => {
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
