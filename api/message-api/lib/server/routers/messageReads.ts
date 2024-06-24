import { getMessageReadById, getMessageReads } from "@/lib/api/messageReads/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageReadIdSchema,
  insertMessageReadParams,
  updateMessageReadParams,
} from "@/lib/db/schema/messageReads";
import { createMessageRead, deleteMessageRead, updateMessageRead } from "@/lib/api/messageReads/mutations";

export const messageReadsRouter = router({
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
