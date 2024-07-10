import { getCompetencyUserEvidenceById, getCompetencyUserEvidences } from "../api/competencyUserEvidences/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  competencyUserEvidenceIdSchema,
  insertCompetencyUserEvidenceParams,
  updateCompetencyUserEvidenceParams,
} from "@soco/competency-db/schema/competencyUserEvidences";
import { createCompetencyUserEvidence, deleteCompetencyUserEvidence, updateCompetencyUserEvidence } from "../api/competencyUserEvidences/mutations";

export const competencyUserEvidencesRouter =createTRPCRouter({
  getCompetencyUserEvidences: publicProcedure.query(async () => {
    return getCompetencyUserEvidences();
  }),
  getCompetencyUserEvidenceById: publicProcedure.input(competencyUserEvidenceIdSchema).query(async ({ input }) => {
    return getCompetencyUserEvidenceById(input.id);
  }),
  createCompetencyUserEvidence: publicProcedure
    .input(insertCompetencyUserEvidenceParams)
    .mutation(async ({ input }) => {
      return createCompetencyUserEvidence(input);
    }),
  updateCompetencyUserEvidence: publicProcedure
    .input(updateCompetencyUserEvidenceParams)
    .mutation(async ({ input }) => {
      return updateCompetencyUserEvidence(input.id, input);
    }),
  deleteCompetencyUserEvidence: publicProcedure
    .input(competencyUserEvidenceIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyUserEvidence(input.id);
    }),
});
