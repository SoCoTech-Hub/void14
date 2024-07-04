import {
  createCompetencyFramework,
  deleteCompetencyFramework,
  updateCompetencyFramework,
} from "../api/competencyFrameworks/mutations";
import {
  getCompetencyFrameworkById,
  getCompetencyFrameworks,
} from "../api/competencyFrameworks/queries";
import {
  competencyFrameworkIdSchema,
  insertCompetencyFrameworkParams,
  updateCompetencyFrameworkParams,
} from "../db/schema/competencyFrameworks";
import { publicProcedure, router } from "../server/trpc";

export const competencyFrameworksRouter = router({
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
