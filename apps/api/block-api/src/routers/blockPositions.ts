import { getBlockPositionById, getBlockPositions } from "../api/blockPositions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  blockPositionIdSchema,
  insertBlockPositionParams,
  updateBlockPositionParams,
} from "@soco/block-db/schema/blockPositions";
import { createBlockPosition, deleteBlockPosition, updateBlockPosition } from "../api/blockPositions/mutations";

export const blockPositionsRouter =createTRPCRouter({
  getBlockPositions: publicProcedure.query(async () => {
    return getBlockPositions();
  }),
  getBlockPositionById: publicProcedure.input(blockPositionIdSchema).query(async ({ input }) => {
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
