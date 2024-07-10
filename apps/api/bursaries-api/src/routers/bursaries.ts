import { getBursaryById, getBursaries } from "../api/bursaries/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  bursaryIdSchema,
  insertBursaryParams,
  updateBursaryParams,
} from "@soco/bursaries-db/schema/bursaries";
import { createBursary, deleteBursary, updateBursary } from "../api/bursaries/mutations";

export const bursariesRouter =createTRPCRouter({
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
