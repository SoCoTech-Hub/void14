import { getCompetencyById, getCompetencies } from "@/lib/api/competencies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyIdSchema,
  insertCompetencyParams,
  updateCompetencyParams,
} from "@/lib/db/schema/competencies";
import { createCompetency, deleteCompetency, updateCompetency } from "@/lib/api/competencies/mutations";

export const competenciesRouter = router({
  getCompetencies: publicProcedure.query(async () => {
    return getCompetencies();
  }),
  getCompetencyById: publicProcedure.input(competencyIdSchema).query(async ({ input }) => {
    return getCompetencyById(input.id);
  }),
  createCompetency: publicProcedure
    .input(insertCompetencyParams)
    .mutation(async ({ input }) => {
      return createCompetency(input);
    }),
  updateCompetency: publicProcedure
    .input(updateCompetencyParams)
    .mutation(async ({ input }) => {
      return updateCompetency(input.id, input);
    }),
  deleteCompetency: publicProcedure
    .input(competencyIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetency(input.id);
    }),
});
