import { getFaqFaqsCategoryById, getFaqFaqsCategories } from "../api/faqFaqsCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  faqFaqsCategoryIdSchema,
  insertFaqFaqsCategoryParams,
  updateFaqFaqsCategoryParams,
} from "@soco/faq-db/schema/faqFaqsCategories";
import { createFaqFaqsCategory, deleteFaqFaqsCategory, updateFaqFaqsCategory } from "../api/faqFaqsCategories/mutations";

export const faqFaqsCategoriesRouter =createTRPCRouter({
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
