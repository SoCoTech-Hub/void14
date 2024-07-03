import { getMessageConversationMemberById, getMessageConversationMembers } from "@/lib/api/messageConversationMembers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageConversationMemberIdSchema,
  insertMessageConversationMemberParams,
  updateMessageConversationMemberParams,
} from "@/lib/db/schema/messageConversationMembers";
import { createMessageConversationMember, deleteMessageConversationMember, updateMessageConversationMember } from "@/lib/api/messageConversationMembers/mutations";

export const messageConversationMembersRouter = router({
  getMessageConversationMembers: publicProcedure.query(async () => {
    return getMessageConversationMembers();
  }),
  getMessageConversationMemberById: publicProcedure.input(messageConversationMemberIdSchema).query(async ({ input }) => {
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
