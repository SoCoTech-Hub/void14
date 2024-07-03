import { getCompetencyTemplateById, getCompetencyTemplates } from "@/lib/api/competencyTemplates/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyTemplateIdSchema,
  insertCompetencyTemplateParams,
  updateCompetencyTemplateParams,
} from "@/lib/db/schema/competencyTemplates";
import { createCompetencyTemplate, deleteCompetencyTemplate, updateCompetencyTemplate } from "@/lib/api/competencyTemplates/mutations";

export const competencyTemplatesRouter = router({
  getCompetencyTemplates: publicProcedure.query(async () => {
    return getCompetencyTemplates();
  }),
  getCompetencyTemplateById: publicProcedure.input(competencyTemplateIdSchema).query(async ({ input }) => {
    return getCompetencyTemplateById(input.id);
  }),
  createCompetencyTemplate: publicProcedure
    .input(insertCompetencyTemplateParams)
    .mutation(async ({ input }) => {
      return createCompetencyTemplate(input);
    }),
  updateCompetencyTemplate: publicProcedure
    .input(updateCompetencyTemplateParams)
    .mutation(async ({ input }) => {
      return updateCompetencyTemplate(input.id, input);
    }),
  deleteCompetencyTemplate: publicProcedure
    .input(competencyTemplateIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyTemplate(input.id);
    }),
});
