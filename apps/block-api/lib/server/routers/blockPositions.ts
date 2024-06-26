import { getBlockPositionById, getBlockPositions } from "@/lib/api/blockPositions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blockPositionIdSchema,
  insertBlockPositionParams,
  updateBlockPositionParams,
} from "@/lib/db/schema/blockPositions";
import { createBlockPosition, deleteBlockPosition, updateBlockPosition } from "@/lib/api/blockPositions/mutations";

export const blockPositionsRouter = router({
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
