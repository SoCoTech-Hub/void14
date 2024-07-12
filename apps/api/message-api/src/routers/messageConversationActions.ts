import {
  insertMessageConversationActionParams,
  messageConversationActionIdSchema,
  updateMessageConversationActionParams,
} from "@soco/message-db/schema/messageConversationActions";

import {
  createMessageConversationAction,
  deleteMessageConversationAction,
  updateMessageConversationAction,
} from "../api/messageConversationActions/mutations";
import {
  getMessageConversationActionById,
  getMessageConversationActions,
} from "../api/messageConversationActions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageConversationActionsRouter = createTRPCRouter({
  getMessageConversationActions: publicProcedure.query(async () => {
    return getMessageConversationActions();
  }),
  getMessageConversationActionById: publicProcedure
    .input(messageConversationActionIdSchema)
    .query(async ({ input }) => {
      return getMessageConversationActionById(input.id);
    }),
  createMessageConversationAction: publicProcedure
    .input(insertMessageConversationActionParams)
    .mutation(async ({ input }) => {
      return createMessageConversationAction(input);
    }),
  updateMessageConversationAction: publicProcedure
    .input(updateMessageConversationActionParams)
    .mutation(async ({ input }) => {
      return updateMessageConversationAction(input.id, input);
    }),
  deleteMessageConversationAction: publicProcedure
    .input(messageConversationActionIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageConversationAction(input.id);
    }),
});
