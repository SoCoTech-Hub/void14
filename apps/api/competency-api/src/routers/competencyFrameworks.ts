import {
  competencyFrameworkIdSchema,
  insertCompetencyFrameworkParams,
  updateCompetencyFrameworkParams,
} from "@soco/competency-db/schema/competencyFrameworks";

import {
  createCompetencyFramework,
  deleteCompetencyFramework,
  updateCompetencyFramework,
} from "../api/competencyFrameworks/mutations";
import {
  getCompetencyFrameworkById,
  getCompetencyFrameworks,
} from "../api/competencyFrameworks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyFrameworksRouter = createTRPCRouter({
  getCompetencyFrameworks: publicProcedure.query(async () => {
    return getCompetencyFrameworks();
  }),
  getCompetencyFrameworkById: publicProcedure
    .input(competencyFrameworkIdSchema)
    .query(async ({ input }) => {
      return getCompetencyFrameworkById(input.id);
    }),
  createCompetencyFramework: publicProcedure
    .input(insertCompetencyFrameworkParams)
    .mutation(async ({ input }) => {
      return createCompetencyFramework(input);
    }),
  updateCompetencyFramework: publicProcedure
    .input(updateCompetencyFrameworkParams)
    .mutation(async ({ input }) => {
      return updateCompetencyFramework(input.id, input);
    }),
  deleteCompetencyFramework: publicProcedure
    .input(competencyFrameworkIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyFramework(input.id);
    }),
});
