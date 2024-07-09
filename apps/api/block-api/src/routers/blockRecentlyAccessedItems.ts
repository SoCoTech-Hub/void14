import {
  blockRecentlyAccessedItemIdSchema,
  insertBlockRecentlyAccessedItemParams,
  updateBlockRecentlyAccessedItemParams,
} from "@soco/block-db/schema/blockRecentlyAccessedItems";

import {
  createBlockRecentlyAccessedItem,
  deleteBlockRecentlyAccessedItem,
  updateBlockRecentlyAccessedItem,
} from "../api/blockRecentlyAccessedItems/mutations";
import {
  getBlockRecentlyAccessedItemById,
  getBlockRecentlyAccessedItems,
} from "../api/blockRecentlyAccessedItems/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blockRecentlyAccessedItemsRouter = createTRPCRouter({
  getBlockRecentlyAccessedItems: publicProcedure.query(async () => {
    return getBlockRecentlyAccessedItems();
  }),
  getBlockRecentlyAccessedItemById: publicProcedure
    .input(blockRecentlyAccessedItemIdSchema)
    .query(async ({ input }) => {
      return getBlockRecentlyAccessedItemById(input.id);
    }),
  createBlockRecentlyAccessedItem: publicProcedure
    .input(insertBlockRecentlyAccessedItemParams)
    .mutation(async ({ input }) => {
      return createBlockRecentlyAccessedItem(input);
    }),
  updateBlockRecentlyAccessedItem: publicProcedure
    .input(updateBlockRecentlyAccessedItemParams)
    .mutation(async ({ input }) => {
      return updateBlockRecentlyAccessedItem(input.id, input);
    }),
  deleteBlockRecentlyAccessedItem: publicProcedure
    .input(blockRecentlyAccessedItemIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlockRecentlyAccessedItem(input.id);
    }),
});
