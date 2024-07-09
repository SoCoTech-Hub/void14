import { getQuizSectionById, getQuizSections } from "../api/quizSections/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizSectionIdSchema,
  insertQuizSectionParams,
  updateQuizSectionParams,
} from "@soco/quiz-db/schema/quizSections";
import { createQuizSection, deleteQuizSection, updateQuizSection } from "../api/quizSections/mutations";

export const quizSectionsRouter =createTRPCRouter({
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