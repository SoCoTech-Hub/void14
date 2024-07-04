import {
  createBlockRecentlyAccessedItem,
  deleteBlockRecentlyAccessedItem,
  updateBlockRecentlyAccessedItem,
} from "../api/blockRecentlyAccessedItems/mutations";
import {
  getBlockRecentlyAccessedItemById,
  getBlockRecentlyAccessedItems,
} from "../api/blockRecentlyAccessedItems/queries";
import {
  blockRecentlyAccessedItemIdSchema,
  insertBlockRecentlyAccessedItemParams,
  updateBlockRecentlyAccessedItemParams,
} from "../db/schema/blockRecentlyAccessedItems";
import { publicProcedure, router } from "../server/trpc";

export const blockRecentlyAccessedItemsRouter = router({
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
