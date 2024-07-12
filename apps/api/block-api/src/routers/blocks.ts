import {
  blockIdSchema,
  insertBlockParams,
  updateBlockParams,
} from "@soco/block-db/schema/blocks";

import { createBlock, deleteBlock, updateBlock } from "../api/blocks/mutations";
import { getBlockById, getBlocks } from "../api/blocks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blocksRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
