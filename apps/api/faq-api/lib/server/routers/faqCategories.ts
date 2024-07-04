import {
  createFaqCategory,
  deleteFaqCategory,
  updateFaqCategory,
} from "../api/faqCategories/mutations";
import {
  getFaqCategories,
  getFaqCategoryById,
} from "../api/faqCategories/queries";
import {
  faqCategoryIdSchema,
  insertFaqCategoryParams,
  updateFaqCategoryParams,
} from "../db/schema/faqCategories";
import { publicProcedure, router } from "../server/trpc";

export const faqCategoriesRouter = router({
  getFaqCategories: publicProcedure.query(async () => {
    return getFaqCategories();
  }),
  getFaqCategoryById: publicProcedure
    .input(faqCategoryIdSchema)
    .query(async ({ input }) => {
      return getFaqCategoryById(input.id);
    }),
  createFaqCategory: publicProcedure
    .input(insertFaqCategoryParams)
    .mutation(async ({ input }) => {
      return createFaqCategory(input);
    }),
  updateFaqCategory: publicProcedure
    .input(updateFaqCategoryParams)
    .mutation(async ({ input }) => {
      return updateFaqCategory(input.id, input);
    }),
  deleteFaqCategory: publicProcedure
    .input(faqCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteFaqCategory(input.id);
    }),
});