import {
  createCompetencyPlanComp,
  deleteCompetencyPlanComp,
  updateCompetencyPlanComp,
} from "../api/competencyPlanComps/mutations";
import {
  getCompetencyPlanCompById,
  getCompetencyPlanComps,
} from "../api/competencyPlanComps/queries";
import {
  competencyPlanCompIdSchema,
  insertCompetencyPlanCompParams,
  updateCompetencyPlanCompParams,
} from "../db/schema/competencyPlanComps";
import { publicProcedure, router } from "../server/trpc";

export const competencyPlanCompsRouter = router({
  getCompetencyPlanComps: publicProcedure.query(async () => {
    return getCompetencyPlanComps();
  }),
  getCompetencyPlanCompById: publicProcedure
    .input(competencyPlanCompIdSchema)
    .query(async ({ input }) => {
      return getCompetencyPlanCompById(input.id);
    }),
  createCompetencyPlanComp: publicProcedure
    .input(insertCompetencyPlanCompParams)
    .mutation(async ({ input }) => {
      return createCompetencyPlanComp(input);
    }),
  updateCompetencyPlanComp: publicProcedure
    .input(updateCompetencyPlanCompParams)
    .mutation(async ({ input }) => {
      return updateCompetencyPlanComp(input.id, input);
    }),
  deleteCompetencyPlanComp: publicProcedure
    .input(competencyPlanCompIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyPlanComp(input.id);
    }),
});
