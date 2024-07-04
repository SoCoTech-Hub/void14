import {
  createCompetencyPlan,
  deleteCompetencyPlan,
  updateCompetencyPlan,
} from "../api/competencyPlans/mutations";
import {
  getCompetencyPlanById,
  getCompetencyPlans,
} from "../api/competencyPlans/queries";
import {
  competencyPlanIdSchema,
  insertCompetencyPlanParams,
  updateCompetencyPlanParams,
} from "../db/schema/competencyPlans";
import { publicProcedure, router } from "../server/trpc";

export const competencyPlansRouter = router({
  getCompetencyPlans: publicProcedure.query(async () => {
    return getCompetencyPlans();
  }),
  getCompetencyPlanById: publicProcedure
    .input(competencyPlanIdSchema)
    .query(async ({ input }) => {
      return getCompetencyPlanById(input.id);
    }),
  createCompetencyPlan: publicProcedure
    .input(insertCompetencyPlanParams)
    .mutation(async ({ input }) => {
      return createCompetencyPlan(input);
    }),
  updateCompetencyPlan: publicProcedure
    .input(updateCompetencyPlanParams)
    .mutation(async ({ input }) => {
      return updateCompetencyPlan(input.id, input);
    }),
  deleteCompetencyPlan: publicProcedure
    .input(competencyPlanIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyPlan(input.id);
    }),
});
