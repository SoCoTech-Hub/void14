import { getBursaryCategoryById, getBursaryCategories } from "../api/bursaryCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  bursaryCategoryIdSchema,
  insertBursaryCategoryParams,
  updateBursaryCategoryParams,
} from "@soco/bursaries-db/schema/bursaryCategories";
import { createBursaryCategory, deleteBursaryCategory, updateBursaryCategory } from "../api/bursaryCategories/mutations";

export const bursaryCategoriesRouter =createTRPCRouter({
  getBursaryCategories: publicProcedure.query(async () => {
    return getBursaryCategories();
  }),
  getBursaryCategoryById: publicProcedure.input(bursaryCategoryIdSchema).query(async ({ input }) => {
    return getBursaryCategoryById(input.id);
  }),
  createBursaryCategory: publicProcedure
    .input(insertBursaryCategoryParams)
    .mutation(async ({ input }) => {
      return createBursaryCategory(input);
    }),
  updateBursaryCategory: publicProcedure
    .input(updateBursaryCategoryParams)
    .mutation(async ({ input }) => {
      return updateBursaryCategory(input.id, input);
    }),
  deleteBursaryCategory: publicProcedure
    .input(bursaryCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteBursaryCategory(input.id);
    }),
});
