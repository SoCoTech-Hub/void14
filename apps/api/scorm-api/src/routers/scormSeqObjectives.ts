import { getScormSeqObjectiveById, getScormSeqObjectives } from "../api/scormSeqObjectives/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  scormSeqObjectiveIdSchema,
  insertScormSeqObjectiveParams,
  updateScormSeqObjectiveParams,
} from "@soco/scorm-db/schema/scormSeqObjectives";
import { createScormSeqObjective, deleteScormSeqObjective, updateScormSeqObjective } from "../api/scormSeqObjectives/mutations";

export const scormSeqObjectivesRouter =createTRPCRouter({
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
