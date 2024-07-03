import { getCompetencyUserEvidenceById, getCompetencyUserEvidences } from "@/lib/api/competencyUserEvidences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyUserEvidenceIdSchema,
  insertCompetencyUserEvidenceParams,
  updateCompetencyUserEvidenceParams,
} from "@/lib/db/schema/competencyUserEvidences";
import { createCompetencyUserEvidence, deleteCompetencyUserEvidence, updateCompetencyUserEvidence } from "@/lib/api/competencyUserEvidences/mutations";

export const competencyUserEvidencesRouter = router({
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
