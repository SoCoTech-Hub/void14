import { getBursaryById, getBursaries } from "@/lib/api/bursaries/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  bursaryIdSchema,
  insertBursaryParams,
  updateBursaryParams,
} from "@/lib/db/schema/bursaries";
import { createBursary, deleteBursary, updateBursary } from "@/lib/api/bursaries/mutations";

export const bursariesRouter = router({
  getBursaries: publicProcedure.query(async () => {
    return getBursaries();
  }),
  getBursaryById: publicProcedure.input(bursaryIdSchema).query(async ({ input }) => {
    return getBursaryById(input.id);
  }),
  createBursary: publicProcedure
    .input(insertBursaryParams)
    .mutation(async ({ input }) => {
      return createBursary(input);
    }),
  updateBursary: publicProcedure
    .input(updateBursaryParams)
    .mutation(async ({ input }) => {
      return updateBursary(input.id, input);
    }),
  deleteBursary: publicProcedure
    .input(bursaryIdSchema)
    .mutation(async ({ input }) => {
      return deleteBursary(input.id);
    }),
});
