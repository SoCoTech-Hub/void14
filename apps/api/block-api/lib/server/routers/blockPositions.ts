import {
  createBlockPosition,
  deleteBlockPosition,
  updateBlockPosition,
} from "../api/blockPositions/mutations";
import {
  getBlockPositionById,
  getBlockPositions,
} from "../api/blockPositions/queries";
import {
  blockPositionIdSchema,
  insertBlockPositionParams,
  updateBlockPositionParams,
} from "../db/schema/blockPositions";
import { publicProcedure, router } from "../server/trpc";

export const blockPositionsRouter = router({
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
