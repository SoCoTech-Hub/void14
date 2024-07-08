import { getFaqById, getFaqs } from "../api/faqs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  faqIdSchema,
  insertFaqParams,
  updateFaqParams,
} from "@soco/faq-db/schema/faqs";
import { createFaq, deleteFaq, updateFaq } from "../api/faqs/mutations";

export const faqsRouter =createTRPCRouter({
  getFaqs: publicProcedure.query(async () => {
    return getFaqs();
  }),
  getFaqById: publicProcedure.input(faqIdSchema).query(async ({ input }) => {
    return getFaqById(input.id);
  }),
  createFaq: publicProcedure
    .input(insertFaqParams)
    .mutation(async ({ input }) => {
      return createFaq(input);
    }),
  updateFaq: publicProcedure
    .input(updateFaqParams)
    .mutation(async ({ input }) => {
      return updateFaq(input.id, input);
    }),
  deleteFaq: publicProcedure
    .input(faqIdSchema)
    .mutation(async ({ input }) => {
      return deleteFaq(input.id);
    }),
});
