import {
  createQuizaccessSebTemplate,
  deleteQuizaccessSebTemplate,
  updateQuizaccessSebTemplate,
} from "../api/quizaccessSebTemplates/mutations";
import {
  getQuizaccessSebTemplateById,
  getQuizaccessSebTemplates,
} from "../api/quizaccessSebTemplates/queries";
import {
  insertQuizaccessSebTemplateParams,
  quizaccessSebTemplateIdSchema,
  updateQuizaccessSebTemplateParams,
} from "../db/schema/quizaccessSebTemplates";
import { publicProcedure, router } from "../server/trpc";

export const quizaccessSebTemplatesRouter = router({
  getQuizaccessSebTemplates: publicProcedure.query(async () => {
    return getQuizaccessSebTemplates();
  }),
  getQuizaccessSebTemplateById: publicProcedure
    .input(quizaccessSebTemplateIdSchema)
    .query(async ({ input }) => {
      return getQuizaccessSebTemplateById(input.id);
    }),
  createQuizaccessSebTemplate: publicProcedure
    .input(insertQuizaccessSebTemplateParams)
    .mutation(async ({ input }) => {
      return createQuizaccessSebTemplate(input);
    }),
  updateQuizaccessSebTemplate: publicProcedure
    .input(updateQuizaccessSebTemplateParams)
    .mutation(async ({ input }) => {
      return updateQuizaccessSebTemplate(input.id, input);
    }),
  deleteQuizaccessSebTemplate: publicProcedure
    .input(quizaccessSebTemplateIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizaccessSebTemplate(input.id);
    }),
});
