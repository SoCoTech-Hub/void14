import { createBlock, deleteBlock, updateBlock } from "../api/blocks/mutations";
import { getBlockById, getBlocks } from "../api/blocks/queries";
import {
  blockIdSchema,
  insertBlockParams,
  updateBlockParams,
} from "../db/schema/blocks";
import { publicProcedure, router } from "../server/trpc";

export const blocksRouter = router({
  getBlocks: publicProcedure.query(async () => {
    return getBlocks();
  }),
  getBlockById: publicProcedure
    .input(blockIdSchema)
    .query(async ({ input }) => {
      return getBlockById(input.id);
    }),
  createBlock: publicProcedure
    .input(insertBlockParams)
    .mutation(async ({ input }) => {
      return createBlock(input);
    }),
  updateBlock: publicProcedure
    .input(updateBlockParams)
    .mutation(async ({ input }) => {
      return updateBlock(input.id, input);
    }),
  deleteBlock: publicProcedure
    .input(blockIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlock(input.id);
    }),
});
