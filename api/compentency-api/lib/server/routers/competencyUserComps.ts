import { getCompetencyUserCompById, getCompetencyUserComps } from "@/lib/api/competencyUserComps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyUserCompIdSchema,
  insertCompetencyUserCompParams,
  updateCompetencyUserCompParams,
} from "@/lib/db/schema/competencyUserComps";
import { createCompetencyUserComp, deleteCompetencyUserComp, updateCompetencyUserComp } from "@/lib/api/competencyUserComps/mutations";

export const competencyUserCompsRouter = router({
  getCompetencyUserComps: publicProcedure.query(async () => {
    return getCompetencyUserComps();
  }),
  getCompetencyUserCompById: publicProcedure.input(competencyUserCompIdSchema).query(async ({ input }) => {
    return getCompetencyUserCompById(input.id);
  }),
  createCompetencyUserComp: publicProcedure
    .input(insertCompetencyUserCompParams)
    .mutation(async ({ input }) => {
      return createCompetencyUserComp(input);
    }),
  updateCompetencyUserComp: publicProcedure
    .input(updateCompetencyUserCompParams)
    .mutation(async ({ input }) => {
      return updateCompetencyUserComp(input.id, input);
    }),
  deleteCompetencyUserComp: publicProcedure
    .input(competencyUserCompIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyUserComp(input.id);
    }),
});
