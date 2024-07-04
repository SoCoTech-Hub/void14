import {
  createMessageinboundDatakey,
  deleteMessageinboundDatakey,
  updateMessageinboundDatakey,
} from "../api/messageinboundDatakeys/mutations";
import {
  getMessageinboundDatakeyById,
  getMessageinboundDatakeys,
} from "../api/messageinboundDatakeys/queries";
import {
  insertMessageinboundDatakeyParams,
  messageinboundDatakeyIdSchema,
  updateMessageinboundDatakeyParams,
} from "../db/schema/messageinboundDatakeys";
import { publicProcedure, router } from "../server/trpc";

export const messageinboundDatakeysRouter = router({
  getMessageinboundDatakeys: publicProcedure.query(async () => {
    return getMessageinboundDatakeys();
  }),
  getMessageinboundDatakeyById: publicProcedure
    .input(messageinboundDatakeyIdSchema)
    .query(async ({ input }) => {
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
