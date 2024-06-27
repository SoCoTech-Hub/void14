import { getChatUserById, getChatUsers } from "@/lib/api/chatUsers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  chatUserIdSchema,
  insertChatUserParams,
  updateChatUserParams,
} from "@/lib/db/schema/chatUsers";
import { createChatUser, deleteChatUser, updateChatUser } from "@/lib/api/chatUsers/mutations";

export const chatUsersRouter = router({
  getChatUsers: publicProcedure.query(async () => {
    return getChatUsers();
  }),
  getChatUserById: publicProcedure.input(chatUserIdSchema).query(async ({ input }) => {
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
