import {
  createBigBlueButtonBn,
  deleteBigBlueButtonBn,
  updateBigBlueButtonBn,
} from "../api/bigBlueButtonBns/mutations";
import {
  getBigBlueButtonBnById,
  getBigBlueButtonBns,
} from "../api/bigBlueButtonBns/queries";
import {
  bigBlueButtonBnIdSchema,
  insertBigBlueButtonBnParams,
  updateBigBlueButtonBnParams,
} from "../db/schema/bigBlueButtonBns";
import { publicProcedure, router } from "../server/trpc";

export const bigBlueButtonBnsRouter = router({
  getBigBlueButtonBns: publicProcedure.query(async () => {
    return getBigBlueButtonBns();
  }),
  getBigBlueButtonBnById: publicProcedure
    .input(bigBlueButtonBnIdSchema)
    .query(async ({ input }) => {
      return getBigBlueButtonBnById(input.id);
    }),
  createBigBlueButtonBn: publicProcedure
    .input(insertBigBlueButtonBnParams)
    .mutation(async ({ input }) => {
      return createBigBlueButtonBn(input);
    }),
  updateBigBlueButtonBn: publicProcedure
    .input(updateBigBlueButtonBnParams)
    .mutation(async ({ input }) => {
      return updateBigBlueButtonBn(input.id, input);
    }),
  deleteBigBlueButtonBn: publicProcedure
    .input(bigBlueButtonBnIdSchema)
    .mutation(async ({ input }) => {
      return deleteBigBlueButtonBn(input.id);
    }),
});
