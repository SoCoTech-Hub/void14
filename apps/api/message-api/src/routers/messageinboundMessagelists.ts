import { getMessageinboundMessagelistById, getMessageinboundMessagelists } from "../api/messageinboundMessagelists/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageinboundMessagelistIdSchema,
  insertMessageinboundMessagelistParams,
  updateMessageinboundMessagelistParams,
} from "@soco/message-db/schema/messageinboundMessagelists";
import { createMessageinboundMessagelist, deleteMessageinboundMessagelist, updateMessageinboundMessagelist } from "../api/messageinboundMessagelists/mutations";

export const messageinboundMessagelistsRouter =createTRPCRouter({
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