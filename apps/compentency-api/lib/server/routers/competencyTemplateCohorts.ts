import { getCompetencyTemplateCohortById, getCompetencyTemplateCohorts } from "@/lib/api/competencyTemplateCohorts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyTemplateCohortIdSchema,
  insertCompetencyTemplateCohortParams,
  updateCompetencyTemplateCohortParams,
} from "@/lib/db/schema/competencyTemplateCohorts";
import { createCompetencyTemplateCohort, deleteCompetencyTemplateCohort, updateCompetencyTemplateCohort } from "@/lib/api/competencyTemplateCohorts/mutations";

export const competencyTemplateCohortsRouter = router({
  getCompetencyTemplateCohorts: publicProcedure.query(async () => {
    return getCompetencyTemplateCohorts();
  }),
  getCompetencyTemplateCohortById: publicProcedure.input(competencyTemplateCohortIdSchema).query(async ({ input }) => {
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
