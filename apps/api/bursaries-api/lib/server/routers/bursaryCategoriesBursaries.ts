import {
  createBursaryCategoriesBursary,
  deleteBursaryCategoriesBursary,
  updateBursaryCategoriesBursary,
} from "../api/bursaryCategoriesBursaries/mutations";
import {
  getBursaryCategoriesBursaries,
  getBursaryCategoriesBursaryById,
} from "../api/bursaryCategoriesBursaries/queries";
import {
  bursaryCategoriesBursaryIdSchema,
  insertBursaryCategoriesBursaryParams,
  updateBursaryCategoriesBursaryParams,
} from "../db/schema/bursaryCategoriesBursaries";
import { publicProcedure, router } from "../server/trpc";

export const bursaryCategoriesBursariesRouter = router({
  getBursaryCategoriesBursaries: publicProcedure.query(async () => {
    return getBursaryCategoriesBursaries();
  }),
  getBursaryCategoriesBursaryById: publicProcedure
    .input(bursaryCategoriesBursaryIdSchema)
    .query(async ({ input }) => {
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
