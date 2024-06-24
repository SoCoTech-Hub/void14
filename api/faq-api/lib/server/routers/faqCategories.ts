import { getFaqCategoryById, getFaqCategories } from "@/lib/api/faqCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  faqCategoryIdSchema,
  insertFaqCategoryParams,
  updateFaqCategoryParams,
} from "@/lib/db/schema/faqCategories";
import { createFaqCategory, deleteFaqCategory, updateFaqCategory } from "@/lib/api/faqCategories/mutations";

export const faqCategoriesRouter = router({
  getFaqCategories: publicProcedure.query(async () => {
    return getFaqCategories();
  }),
  getFaqCategoryById: publicProcedure.input(faqCategoryIdSchema).query(async ({ input }) => {
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
