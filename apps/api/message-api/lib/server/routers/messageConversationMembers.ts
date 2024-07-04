import {
  createMessageConversationMember,
  deleteMessageConversationMember,
  updateMessageConversationMember,
} from "../api/messageConversationMembers/mutations";
import {
  getMessageConversationMemberById,
  getMessageConversationMembers,
} from "../api/messageConversationMembers/queries";
import {
  insertMessageConversationMemberParams,
  messageConversationMemberIdSchema,
  updateMessageConversationMemberParams,
} from "../db/schema/messageConversationMembers";
import { publicProcedure, router } from "../server/trpc";

export const messageConversationMembersRouter = router({
  getMessageConversationMembers: publicProcedure.query(async () => {
    return getMessageConversationMembers();
  }),
  getMessageConversationMemberById: publicProcedure
    .input(messageConversationMemberIdSchema)
    .query(async ({ input }) => {
      return getMessageConversationMemberById(input.id);
    }),
  createMessageConversationMember: publicProcedure
    .input(insertMessageConversationMemberParams)
    .mutation(async ({ input }) => {
      return createMessageConversationMember(input);
    }),
  updateMessageConversationMember: publicProcedure
    .input(updateMessageConversationMemberParams)
    .mutation(async ({ input }) => {
      return updateMessageConversationMember(input.id, input);
    }),
  deleteMessageConversationMember: publicProcedure
    .input(messageConversationMemberIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageConversationMember(input.id);
    }),
});
