import { getQuizaccessSebTemplateById, getQuizaccessSebTemplates } from "@/lib/api/quizaccessSebTemplates/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizaccessSebTemplateIdSchema,
  insertQuizaccessSebTemplateParams,
  updateQuizaccessSebTemplateParams,
} from "@/lib/db/schema/quizaccessSebTemplates";
import { createQuizaccessSebTemplate, deleteQuizaccessSebTemplate, updateQuizaccessSebTemplate } from "@/lib/api/quizaccessSebTemplates/mutations";

export const quizaccessSebTemplatesRouter = router({
  getQuizaccessSebTemplates: publicProcedure.query(async () => {
    return getQuizaccessSebTemplates();
  }),
  getQuizaccessSebTemplateById: publicProcedure.input(quizaccessSebTemplateIdSchema).query(async ({ input }) => {
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
