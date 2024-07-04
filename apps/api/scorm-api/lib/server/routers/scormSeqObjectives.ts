import {
  createScormSeqObjective,
  deleteScormSeqObjective,
  updateScormSeqObjective,
} from "../api/scormSeqObjectives/mutations";
import {
  getScormSeqObjectiveById,
  getScormSeqObjectives,
} from "../api/scormSeqObjectives/queries";
import {
  insertScormSeqObjectiveParams,
  scormSeqObjectiveIdSchema,
  updateScormSeqObjectiveParams,
} from "../db/schema/scormSeqObjectives";
import { publicProcedure, router } from "../server/trpc";

export const scormSeqObjectivesRouter = router({
  getScormSeqObjectives: publicProcedure.query(async () => {
    return getScormSeqObjectives();
  }),
  getScormSeqObjectiveById: publicProcedure
    .input(scormSeqObjectiveIdSchema)
    .query(async ({ input }) => {
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
