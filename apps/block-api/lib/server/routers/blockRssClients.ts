import { getBlockRssClientById, getBlockRssClients } from "@/lib/api/blockRssClients/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blockRssClientIdSchema,
  insertBlockRssClientParams,
  updateBlockRssClientParams,
} from "@/lib/db/schema/blockRssClients";
import { createBlockRssClient, deleteBlockRssClient, updateBlockRssClient } from "@/lib/api/blockRssClients/mutations";

export const blockRssClientsRouter = router({
  getBlockRssClients: publicProcedure.query(async () => {
    return getBlockRssClients();
  }),
  getBlockRssClientById: publicProcedure.input(blockRssClientIdSchema).query(async ({ input }) => {
    return getBlockRssClientById(input.id);
  }),
  createBlockRssClient: publicProcedure
    .input(insertBlockRssClientParams)
    .mutation(async ({ input }) => {
      return createBlockRssClient(input);
    }),
  updateBlockRssClient: publicProcedure
    .input(updateBlockRssClientParams)
    .mutation(async ({ input }) => {
      return updateBlockRssClient(input.id, input);
    }),
  deleteBlockRssClient: publicProcedure
    .input(blockRssClientIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlockRssClient(input.id);
    }),
});
