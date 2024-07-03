import { getCompetencyEvidenceById, getCompetencyEvidences } from "@/lib/api/competencyEvidences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyEvidenceIdSchema,
  insertCompetencyEvidenceParams,
  updateCompetencyEvidenceParams,
} from "@/lib/db/schema/competencyEvidences";
import { createCompetencyEvidence, deleteCompetencyEvidence, updateCompetencyEvidence } from "@/lib/api/competencyEvidences/mutations";

export const competencyEvidencesRouter = router({
  getCompetencyEvidences: publicProcedure.query(async () => {
    return getCompetencyEvidences();
  }),
  getCompetencyEvidenceById: publicProcedure.input(competencyEvidenceIdSchema).query(async ({ input }) => {
    return getCompetencyEvidenceById(input.id);
  }),
  createCompetencyEvidence: publicProcedure
    .input(insertCompetencyEvidenceParams)
    .mutation(async ({ input }) => {
      return createCompetencyEvidence(input);
    }),
  updateCompetencyEvidence: publicProcedure
    .input(updateCompetencyEvidenceParams)
    .mutation(async ({ input }) => {
      return updateCompetencyEvidence(input.id, input);
    }),
  deleteCompetencyEvidence: publicProcedure
    .input(competencyEvidenceIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyEvidence(input.id);
    }),
});
