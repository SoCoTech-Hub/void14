import { getCompetencyFrameworkById, getCompetencyFrameworks } from "@/lib/api/competencyFrameworks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyFrameworkIdSchema,
  insertCompetencyFrameworkParams,
  updateCompetencyFrameworkParams,
} from "@/lib/db/schema/competencyFrameworks";
import { createCompetencyFramework, deleteCompetencyFramework, updateCompetencyFramework } from "@/lib/api/competencyFrameworks/mutations";

export const competencyFrameworksRouter = router({
  getCompetencyFrameworks: publicProcedure.query(async () => {
    return getCompetencyFrameworks();
  }),
  getCompetencyFrameworkById: publicProcedure.input(competencyFrameworkIdSchema).query(async ({ input }) => {
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
