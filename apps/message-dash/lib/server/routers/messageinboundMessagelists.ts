import { getMessageinboundMessagelistById, getMessageinboundMessagelists } from "@/lib/api/messageinboundMessagelists/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageinboundMessagelistIdSchema,
  insertMessageinboundMessagelistParams,
  updateMessageinboundMessagelistParams,
} from "@/lib/db/schema/messageinboundMessagelists";
import { createMessageinboundMessagelist, deleteMessageinboundMessagelist, updateMessageinboundMessagelist } from "@/lib/api/messageinboundMessagelists/mutations";

export const messageinboundMessagelistsRouter = router({
  getMessageinboundMessagelists: publicProcedure.query(async () => {
    return getMessageinboundMessagelists();
  }),
  getMessageinboundMessagelistById: publicProcedure.input(messageinboundMessagelistIdSchema).query(async ({ input }) => {
    return getMessageinboundMessagelistById(input.id);
  }),
  createMessageinboundMessagelist: publicProcedure
    .input(insertMessageinboundMessagelistParams)
    .mutation(async ({ input }) => {
      return createMessageinboundMessagelist(input);
    }),
  updateMessageinboundMessagelist: publicProcedure
    .input(updateMessageinboundMessagelistParams)
    .mutation(async ({ input }) => {
      return updateMessageinboundMessagelist(input.id, input);
    }),
  deleteMessageinboundMessagelist: publicProcedure
    .input(messageinboundMessagelistIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageinboundMessagelist(input.id);
    }),
});
