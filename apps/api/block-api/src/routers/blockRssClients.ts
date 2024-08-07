import {
  blockRssClientIdSchema,
  insertBlockRssClientParams,
  updateBlockRssClientParams,
} from "@soco/block-db/schema/blockRssClients";

import {
  createBlockRssClient,
  deleteBlockRssClient,
  updateBlockRssClient,
} from "../api/blockRssClients/mutations";
import {
  getBlockRssClientById,
  getBlockRssClients,
} from "../api/blockRssClients/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blockRssClientsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getBlockRssClients: publicProcedure.query(async () => {
      return getBlockRssClients();
    }),
    getBlockRssClientById: publicProcedure
      .input(blockRssClientIdSchema)
      .query(async ({ input }) => {
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
