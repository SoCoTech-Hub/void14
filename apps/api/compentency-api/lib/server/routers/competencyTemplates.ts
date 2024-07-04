import {
  createCompetencyTemplate,
  deleteCompetencyTemplate,
  updateCompetencyTemplate,
} from "../api/competencyTemplates/mutations";
import {
  getCompetencyTemplateById,
  getCompetencyTemplates,
} from "../api/competencyTemplates/queries";
import {
  competencyTemplateIdSchema,
  insertCompetencyTemplateParams,
  updateCompetencyTemplateParams,
} from "../db/schema/competencyTemplates";
import { publicProcedure, router } from "../server/trpc";

export const competencyTemplatesRouter = router({
  getCompetencyTemplates: publicProcedure.query(async () => {
    return getCompetencyTemplates();
  }),
  getCompetencyTemplateById: publicProcedure
    .input(competencyTemplateIdSchema)
    .query(async ({ input }) => {
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
