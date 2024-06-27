import { getBlockById, getBlocks } from "@/lib/api/blocks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blockIdSchema,
  insertBlockParams,
  updateBlockParams,
} from "@/lib/db/schema/blocks";
import { createBlock, deleteBlock, updateBlock } from "@/lib/api/blocks/mutations";

export const blocksRouter = router({
  getBlocks: publicProcedure.query(async () => {
    return getBlocks();
  }),
  getBlockById: publicProcedure.input(blockIdSchema).query(async ({ input }) => {
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
