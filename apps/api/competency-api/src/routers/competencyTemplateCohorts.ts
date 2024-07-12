import {
  competencyTemplateCohortIdSchema,
  insertCompetencyTemplateCohortParams,
  updateCompetencyTemplateCohortParams,
} from "@soco/competency-db/schema/competencyTemplateCohorts";

import {
  createCompetencyTemplateCohort,
  deleteCompetencyTemplateCohort,
  updateCompetencyTemplateCohort,
} from "../api/competencyTemplateCohorts/mutations";
import {
  getCompetencyTemplateCohortById,
  getCompetencyTemplateCohorts,
} from "../api/competencyTemplateCohorts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyTemplateCohortsRouter = createTRPCRouter({
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
