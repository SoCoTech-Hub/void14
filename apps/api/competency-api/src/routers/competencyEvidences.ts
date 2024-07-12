import {
  competencyEvidenceIdSchema,
  insertCompetencyEvidenceParams,
  updateCompetencyEvidenceParams,
} from "@soco/competency-db/schema/competencyEvidences";

import {
  createCompetencyEvidence,
  deleteCompetencyEvidence,
  updateCompetencyEvidence,
} from "../api/competencyEvidences/mutations";
import {
  getCompetencyEvidenceById,
  getCompetencyEvidences,
} from "../api/competencyEvidences/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyEvidencesRouter = createTRPCRouter({
  getCompetencyEvidences: publicProcedure.query(async () => {
    return getCompetencyEvidences();
  }),
  getCompetencyEvidenceById: publicProcedure
    .input(competencyEvidenceIdSchema)
    .query(async ({ input }) => {
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
