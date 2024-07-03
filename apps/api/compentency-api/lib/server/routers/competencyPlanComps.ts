import { getCompetencyPlanCompById, getCompetencyPlanComps } from "@/lib/api/competencyPlanComps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyPlanCompIdSchema,
  insertCompetencyPlanCompParams,
  updateCompetencyPlanCompParams,
} from "@/lib/db/schema/competencyPlanComps";
import { createCompetencyPlanComp, deleteCompetencyPlanComp, updateCompetencyPlanComp } from "@/lib/api/competencyPlanComps/mutations";

export const competencyPlanCompsRouter = router({
  getCompetencyPlanComps: publicProcedure.query(async () => {
    return getCompetencyPlanComps();
  }),
  getCompetencyPlanCompById: publicProcedure.input(competencyPlanCompIdSchema).query(async ({ input }) => {
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
