import {
  insertScormSeqObjectiveParams,
  scormSeqObjectiveIdSchema,
  updateScormSeqObjectiveParams,
} from "@soco/scorm-db/schema/scormSeqObjectives";

import {
  createScormSeqObjective,
  deleteScormSeqObjective,
  updateScormSeqObjective,
} from "../api/scormSeqObjectives/mutations";
import {
  getScormSeqObjectiveById,
  getScormSeqObjectives,
} from "../api/scormSeqObjectives/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormSeqObjectivesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
