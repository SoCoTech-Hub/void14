import {
  blockPositionIdSchema,
  insertBlockPositionParams,
  updateBlockPositionParams,
} from "@soco/block-db/schema/blockPositions";

import {
  createBlockPosition,
  deleteBlockPosition,
  updateBlockPosition,
} from "../api/blockPositions/mutations";
import {
  getBlockPositionById,
  getBlockPositions,
} from "../api/blockPositions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blockPositionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getBlockPositions: publicProcedure.query(async () => {
      return getBlockPositions();
    }),
    getBlockPositionById: publicProcedure
      .input(blockPositionIdSchema)
      .query(async ({ input }) => {
        return getBlockPositionById(input.id);
      }),
    createBlockPosition: publicProcedure
      .input(insertBlockPositionParams)
      .mutation(async ({ input }) => {
        return createBlockPosition(input);
      }),
    updateBlockPosition: publicProcedure
      .input(updateBlockPositionParams)
      .mutation(async ({ input }) => {
        return updateBlockPosition(input.id, input);
      }),
    deleteBlockPosition: publicProcedure
      .input(blockPositionIdSchema)
      .mutation(async ({ input }) => {
        return deleteBlockPosition(input.id);
      }),
  });
