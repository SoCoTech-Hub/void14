import { getBursaryCategoriesBursaryById, getBursaryCategoriesBursaries } from "../api/bursaryCategoriesBursaries/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  bursaryCategoriesBursaryIdSchema,
  insertBursaryCategoriesBursaryParams,
  updateBursaryCategoriesBursaryParams,
} from "@soco/bursaries-db/schema/bursaryCategoriesBursaries";
import { createBursaryCategoriesBursary, deleteBursaryCategoriesBursary, updateBursaryCategoriesBursary } from "../api/bursaryCategoriesBursaries/mutations";

export const bursaryCategoriesBursariesRouter =createTRPCRouter({
  getBursaryCategoriesBursaries: publicProcedure.query(async () => {
    return getBursaryCategoriesBursaries();
  }),
  getBursaryCategoriesBursaryById: publicProcedure.input(bursaryCategoriesBursaryIdSchema).query(async ({ input }) => {
    return getBursaryCategoriesBursaryById(input.id);
  }),
  createBursaryCategoriesBursary: publicProcedure
    .input(insertBursaryCategoriesBursaryParams)
    .mutation(async ({ input }) => {
      return createBursaryCategoriesBursary(input);
    }),
  updateBursaryCategoriesBursary: publicProcedure
    .input(updateBursaryCategoriesBursaryParams)
    .mutation(async ({ input }) => {
      return updateBursaryCategoriesBursary(input.id, input);
    }),
  deleteBursaryCategoriesBursary: publicProcedure
    .input(bursaryCategoriesBursaryIdSchema)
    .mutation(async ({ input }) => {
      return deleteBursaryCategoriesBursary(input.id);
    }),
});
