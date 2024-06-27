import { getFaqFaqsCategoryById, getFaqFaqsCategories } from "@/lib/api/faqFaqsCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  faqFaqsCategoryIdSchema,
  insertFaqFaqsCategoryParams,
  updateFaqFaqsCategoryParams,
} from "@/lib/db/schema/faqFaqsCategories";
import { createFaqFaqsCategory, deleteFaqFaqsCategory, updateFaqFaqsCategory } from "@/lib/api/faqFaqsCategories/mutations";

export const faqFaqsCategoriesRouter = router({
  getFaqFaqsCategories: publicProcedure.query(async () => {
    return getFaqFaqsCategories();
  }),
  getFaqFaqsCategoryById: publicProcedure.input(faqFaqsCategoryIdSchema).query(async ({ input }) => {
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
