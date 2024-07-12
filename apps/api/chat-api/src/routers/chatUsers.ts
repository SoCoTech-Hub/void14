import {
  chatUserIdSchema,
  insertChatUserParams,
  updateChatUserParams,
} from "@soco/chat-db/schema/chatUsers";

import {
  createChatUser,
  deleteChatUser,
  updateChatUser,
} from "../api/chatUsers/mutations";
import { getChatUserById, getChatUsers } from "../api/chatUsers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatUsersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getChatUsers: publicProcedure.query(async () => {
      return getChatUsers();
    }),
    getChatUserById: publicProcedure
      .input(chatUserIdSchema)
      .query(async ({ input }) => {
        return getChatUserById(input.id);
      }),
    createChatUser: publicProcedure
      .input(insertChatUserParams)
      .mutation(async ({ input }) => {
        return createChatUser(input);
      }),
    updateChatUser: publicProcedure
      .input(updateChatUserParams)
      .mutation(async ({ input }) => {
        return updateChatUser(input.id, input);
      }),
    deleteChatUser: publicProcedure
      .input(chatUserIdSchema)
      .mutation(async ({ input }) => {
        return deleteChatUser(input.id);
      }),
  });
