import { getMessageinboundDatakeyById, getMessageinboundDatakeys } from "@/lib/api/messageinboundDatakeys/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageinboundDatakeyIdSchema,
  insertMessageinboundDatakeyParams,
  updateMessageinboundDatakeyParams,
} from "@/lib/db/schema/messageinboundDatakeys";
import { createMessageinboundDatakey, deleteMessageinboundDatakey, updateMessageinboundDatakey } from "@/lib/api/messageinboundDatakeys/mutations";

export const messageinboundDatakeysRouter = router({
  getMessageinboundDatakeys: publicProcedure.query(async () => {
    return getMessageinboundDatakeys();
  }),
  getMessageinboundDatakeyById: publicProcedure.input(messageinboundDatakeyIdSchema).query(async ({ input }) => {
    return getMessageinboundDatakeyById(input.id);
  }),
  createMessageinboundDatakey: publicProcedure
    .input(insertMessageinboundDatakeyParams)
    .mutation(async ({ input }) => {
      return createMessageinboundDatakey(input);
    }),
  updateMessageinboundDatakey: publicProcedure
    .input(updateMessageinboundDatakeyParams)
    .mutation(async ({ input }) => {
      return updateMessageinboundDatakey(input.id, input);
    }),
  deleteMessageinboundDatakey: publicProcedure
    .input(messageinboundDatakeyIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageinboundDatakey(input.id);
    }),
});
