import {
  insertMessageContactParams,
  messageContactIdSchema,
  updateMessageContactParams,
} from "@soco/message-db/schema/messageContacts";

import {
  createMessageContact,
  deleteMessageContact,
  updateMessageContact,
} from "../api/messageContacts/mutations";
import {
  getMessageContactById,
  getMessageContacts,
} from "../api/messageContacts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageContactsRouter = createTRPCRouter({
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
