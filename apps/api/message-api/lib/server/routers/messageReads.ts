import {
  createMessageRead,
  deleteMessageRead,
  updateMessageRead,
} from "../api/messageReads/mutations";
import {
  getMessageReadById,
  getMessageReads,
} from "../api/messageReads/queries";
import {
  insertMessageReadParams,
  messageReadIdSchema,
  updateMessageReadParams,
} from "../db/schema/messageReads";
import { publicProcedure, router } from "../server/trpc";

export const messageReadsRouter = router({
  getMessageReads: publicProcedure.query(async () => {
    return getMessageReads();
  }),
  getMessageReadById: publicProcedure
    .input(messageReadIdSchema)
    .query(async ({ input }) => {
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
