import {
  createFaqFaqsCategory,
  deleteFaqFaqsCategory,
  updateFaqFaqsCategory,
} from "../api/faqFaqsCategories/mutations";
import {
  getFaqFaqsCategories,
  getFaqFaqsCategoryById,
} from "../api/faqFaqsCategories/queries";
import {
  faqFaqsCategoryIdSchema,
  insertFaqFaqsCategoryParams,
  updateFaqFaqsCategoryParams,
} from "../db/schema/faqFaqsCategories";
import { publicProcedure, router } from "../server/trpc";

export const faqFaqsCategoriesRouter = router({
  getFaqFaqsCategories: publicProcedure.query(async () => {
    return getFaqFaqsCategories();
  }),
  getFaqFaqsCategoryById: publicProcedure
    .input(faqFaqsCategoryIdSchema)
    .query(async ({ input }) => {
      return getFaqFaqsCategoryById(input.id);
    }),
  createFaqFaqsCategory: publicProcedure
    .input(insertFaqFaqsCategoryParams)
    .mutation(async ({ input }) => {
      return createFaqFaqsCategory(input);
    }),
  updateFaqFaqsCategory: publicProcedure
    .input(updateFaqFaqsCategoryParams)
    .mutation(async ({ input }) => {
      return updateFaqFaqsCategory(input.id, input);
    }),
  deleteFaqFaqsCategory: publicProcedure
    .input(faqFaqsCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteFaqFaqsCategory(input.id);
    }),
});
