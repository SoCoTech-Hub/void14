import { getBigBlueButtonBnById, getBigBlueButtonBns } from "@/lib/api/bigBlueButtonBns/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  bigBlueButtonBnIdSchema,
  insertBigBlueButtonBnParams,
  updateBigBlueButtonBnParams,
} from "@/lib/db/schema/bigBlueButtonBns";
import { createBigBlueButtonBn, deleteBigBlueButtonBn, updateBigBlueButtonBn } from "@/lib/api/bigBlueButtonBns/mutations";

export const bigBlueButtonBnsRouter = router({
  getBigBlueButtonBns: publicProcedure.query(async () => {
    return getBigBlueButtonBns();
  }),
  getBigBlueButtonBnById: publicProcedure.input(bigBlueButtonBnIdSchema).query(async ({ input }) => {
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
