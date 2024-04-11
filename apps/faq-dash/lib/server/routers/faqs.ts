import { getFaqById, getFaqs } from "@/lib/api/faqs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  faqIdSchema,
  insertFaqParams,
  updateFaqParams,
} from "@/lib/db/schema/faqs";
import { createFaq, deleteFaq, updateFaq } from "@/lib/api/faqs/mutations";

export const faqsRouter = router({
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
