import { getBlockRecentlyAccessedItemById, getBlockRecentlyAccessedItems } from "@/lib/api/blockRecentlyAccessedItems/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blockRecentlyAccessedItemIdSchema,
  insertBlockRecentlyAccessedItemParams,
  updateBlockRecentlyAccessedItemParams,
} from "@/lib/db/schema/blockRecentlyAccessedItems";
import { createBlockRecentlyAccessedItem, deleteBlockRecentlyAccessedItem, updateBlockRecentlyAccessedItem } from "@/lib/api/blockRecentlyAccessedItems/mutations";

export const blockRecentlyAccessedItemsRouter = router({
  getBlockRecentlyAccessedItems: publicProcedure.query(async () => {
    return getBlockRecentlyAccessedItems();
  }),
  getBlockRecentlyAccessedItemById: publicProcedure.input(blockRecentlyAccessedItemIdSchema).query(async ({ input }) => {
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
