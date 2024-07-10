import { getCompetencyUserEvidenceCompById, getCompetencyUserEvidenceComps } from "../api/competencyUserEvidenceComps/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  competencyUserEvidenceCompIdSchema,
  insertCompetencyUserEvidenceCompParams,
  updateCompetencyUserEvidenceCompParams,
} from "@soco/competency-db/schema/competencyUserEvidenceComps";
import { createCompetencyUserEvidenceComp, deleteCompetencyUserEvidenceComp, updateCompetencyUserEvidenceComp } from "../api/competencyUserEvidenceComps/mutations";

export const competencyUserEvidenceCompsRouter =createTRPCRouter({
  getCompetencyUserEvidenceComps: publicProcedure.query(async () => {
    return getCompetencyUserEvidenceComps();
  }),
  getCompetencyUserEvidenceCompById: publicProcedure.input(competencyUserEvidenceCompIdSchema).query(async ({ input }) => {
    return getCompetencyUserEvidenceCompById(input.id);
  }),
  createCompetencyUserEvidenceComp: publicProcedure
    .input(insertCompetencyUserEvidenceCompParams)
    .mutation(async ({ input }) => {
      return createCompetencyUserEvidenceComp(input);
    }),
  updateCompetencyUserEvidenceComp: publicProcedure
    .input(updateCompetencyUserEvidenceCompParams)
    .mutation(async ({ input }) => {
      return updateCompetencyUserEvidenceComp(input.id, input);
    }),
  deleteCompetencyUserEvidenceComp: publicProcedure
    .input(competencyUserEvidenceCompIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyUserEvidenceComp(input.id);
    }),
});
