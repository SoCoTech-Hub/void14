import {
  createMessageContact,
  deleteMessageContact,
  updateMessageContact,
} from "../api/messageContacts/mutations";
import {
  getMessageContactById,
  getMessageContacts,
} from "../api/messageContacts/queries";
import {
  insertMessageContactParams,
  messageContactIdSchema,
  updateMessageContactParams,
} from "../db/schema/messageContacts";
import { publicProcedure, router } from "../server/trpc";

export const messageContactsRouter = router({
  getMessageContacts: publicProcedure.query(async () => {
    return getMessageContacts();
  }),
  getMessageContactById: publicProcedure
    .input(messageContactIdSchema)
    .query(async ({ input }) => {
      return getMessageContactById(input.id);
    }),
  createMessageContact: publicProcedure
    .input(insertMessageContactParams)
    .mutation(async ({ input }) => {
      return createMessageContact(input);
    }),
  updateMessageContact: publicProcedure
    .input(updateMessageContactParams)
    .mutation(async ({ input }) => {
      return updateMessageContact(input.id, input);
    }),
  deleteMessageContact: publicProcedure
    .input(messageContactIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageContact(input.id);
    }),
});
