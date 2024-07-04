import {
  createCompetencyTemplateCohort,
  deleteCompetencyTemplateCohort,
  updateCompetencyTemplateCohort,
} from "../api/competencyTemplateCohorts/mutations";
import {
  getCompetencyTemplateCohortById,
  getCompetencyTemplateCohorts,
} from "../api/competencyTemplateCohorts/queries";
import {
  competencyTemplateCohortIdSchema,
  insertCompetencyTemplateCohortParams,
  updateCompetencyTemplateCohortParams,
} from "../db/schema/competencyTemplateCohorts";
import { publicProcedure, router } from "../server/trpc";

export const competencyTemplateCohortsRouter = router({
  getCompetencyTemplateCohorts: publicProcedure.query(async () => {
    return getCompetencyTemplateCohorts();
  }),
  getCompetencyTemplateCohortById: publicProcedure
    .input(competencyTemplateCohortIdSchema)
    .query(async ({ input }) => {
      return getCompetencyTemplateCohortById(input.id);
    }),
  createCompetencyTemplateCohort: publicProcedure
    .input(insertCompetencyTemplateCohortParams)
    .mutation(async ({ input }) => {
      return createCompetencyTemplateCohort(input);
    }),
  updateCompetencyTemplateCohort: publicProcedure
    .input(updateCompetencyTemplateCohortParams)
    .mutation(async ({ input }) => {
      return updateCompetencyTemplateCohort(input.id, input);
    }),
  deleteCompetencyTemplateCohort: publicProcedure
    .input(competencyTemplateCohortIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyTemplateCohort(input.id);
    }),
});
