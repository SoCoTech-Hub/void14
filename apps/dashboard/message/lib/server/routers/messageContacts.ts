import { getMessageContactById, getMessageContacts } from "@/lib/api/messageContacts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageContactIdSchema,
  insertMessageContactParams,
  updateMessageContactParams,
} from "@/lib/db/schema/messageContacts";
import { createMessageContact, deleteMessageContact, updateMessageContact } from "@/lib/api/messageContacts/mutations";

export const messageContactsRouter = router({
  getMessageContacts: publicProcedure.query(async () => {
    return getMessageContacts();
  }),
  getMessageContactById: publicProcedure.input(messageContactIdSchema).query(async ({ input }) => {
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
