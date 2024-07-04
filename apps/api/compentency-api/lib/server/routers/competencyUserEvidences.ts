import {
  createCompetencyUserEvidence,
  deleteCompetencyUserEvidence,
  updateCompetencyUserEvidence,
} from "../api/competencyUserEvidences/mutations";
import {
  getCompetencyUserEvidenceById,
  getCompetencyUserEvidences,
} from "../api/competencyUserEvidences/queries";
import {
  competencyUserEvidenceIdSchema,
  insertCompetencyUserEvidenceParams,
  updateCompetencyUserEvidenceParams,
} from "../db/schema/competencyUserEvidences";
import { publicProcedure, router } from "../server/trpc";

export const competencyUserEvidencesRouter = router({
  getCompetencyUserEvidences: publicProcedure.query(async () => {
    return getCompetencyUserEvidences();
  }),
  getCompetencyUserEvidenceById: publicProcedure
    .input(competencyUserEvidenceIdSchema)
    .query(async ({ input }) => {
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
