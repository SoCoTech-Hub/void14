import { getMessageReadById, getMessageReads } from "../api/messageReads/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageReadIdSchema,
  insertMessageReadParams,
  updateMessageReadParams,
} from "@soco/message-db/schema/messageReads";
import { createMessageRead, deleteMessageRead, updateMessageRead } from "../api/messageReads/mutations";

export const messageReadsRouter =createTRPCRouter({
  getMessageReads: publicProcedure.query(async () => {
    return getMessageReads();
  }),
  getMessageReadById: publicProcedure.input(messageReadIdSchema).query(async ({ input }) => {
    return getMessageReadById(input.id);
  }),
  createMessageRead: publicProcedure
    .input(insertMessageReadParams)
    .mutation(async ({ input }) => {
      return createMessageRead(input);
    }),
  updateMessageRead: publicProcedure
    .input(updateMessageReadParams)
    .mutation(async ({ input }) => {
      return updateMessageRead(input.id, input);
    }),
  deleteMessageRead: publicProcedure
    .input(messageReadIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageRead(input.id);
    }),
});
