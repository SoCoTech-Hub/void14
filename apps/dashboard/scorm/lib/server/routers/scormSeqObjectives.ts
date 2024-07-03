import { getScormSeqObjectiveById, getScormSeqObjectives } from "@/lib/api/scormSeqObjectives/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormSeqObjectiveIdSchema,
  insertScormSeqObjectiveParams,
  updateScormSeqObjectiveParams,
} from "@/lib/db/schema/scormSeqObjectives";
import { createScormSeqObjective, deleteScormSeqObjective, updateScormSeqObjective } from "@/lib/api/scormSeqObjectives/mutations";

export const scormSeqObjectivesRouter = router({
  getScormSeqObjectives: publicProcedure.query(async () => {
    return getScormSeqObjectives();
  }),
  getScormSeqObjectiveById: publicProcedure.input(scormSeqObjectiveIdSchema).query(async ({ input }) => {
    return getScormSeqObjectiveById(input.id);
  }),
  createScormSeqObjective: publicProcedure
    .input(insertScormSeqObjectiveParams)
    .mutation(async ({ input }) => {
      return createScormSeqObjective(input);
    }),
  updateScormSeqObjective: publicProcedure
    .input(updateScormSeqObjectiveParams)
    .mutation(async ({ input }) => {
      return updateScormSeqObjective(input.id, input);
    }),
  deleteScormSeqObjective: publicProcedure
    .input(scormSeqObjectiveIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormSeqObjective(input.id);
    }),
});
