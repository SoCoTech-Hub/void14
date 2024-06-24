import { getQuizSectionById, getQuizSections } from "@/lib/api/quizSections/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizSectionIdSchema,
  insertQuizSectionParams,
  updateQuizSectionParams,
} from "@/lib/db/schema/quizSections";
import { createQuizSection, deleteQuizSection, updateQuizSection } from "@/lib/api/quizSections/mutations";

export const quizSectionsRouter = router({
  getQuizSections: publicProcedure.query(async () => {
    return getQuizSections();
  }),
  getQuizSectionById: publicProcedure.input(quizSectionIdSchema).query(async ({ input }) => {
    return getQuizSectionById(input.id);
  }),
  createQuizSection: publicProcedure
    .input(insertQuizSectionParams)
    .mutation(async ({ input }) => {
      return createQuizSection(input);
    }),
  updateQuizSection: publicProcedure
    .input(updateQuizSectionParams)
    .mutation(async ({ input }) => {
      return updateQuizSection(input.id, input);
    }),
  deleteQuizSection: publicProcedure
    .input(quizSectionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizSection(input.id);
    }),
});
