import {
  createScormAiccSession,
  deleteScormAiccSession,
  updateScormAiccSession,
} from "../api/scormAiccSessions/mutations";
import {
  getScormAiccSessionById,
  getScormAiccSessions,
} from "../api/scormAiccSessions/queries";
import {
  insertScormAiccSessionParams,
  scormAiccSessionIdSchema,
  updateScormAiccSessionParams,
} from "../db/schema/scormAiccSessions";
import { publicProcedure, router } from "../server/trpc";

export const scormAiccSessionsRouter = router({
  getScormAiccSessions: publicProcedure.query(async () => {
    return getScormAiccSessions();
  }),
  getScormAiccSessionById: publicProcedure
    .input(scormAiccSessionIdSchema)
    .query(async ({ input }) => {
      return getScormAiccSessionById(input.id);
    }),
  createScormAiccSession: publicProcedure
    .input(insertScormAiccSessionParams)
    .mutation(async ({ input }) => {
      return createScormAiccSession(input);
    }),
  updateScormAiccSession: publicProcedure
    .input(updateScormAiccSessionParams)
    .mutation(async ({ input }) => {
      return updateScormAiccSession(input.id, input);
    }),
  deleteScormAiccSession: publicProcedure
    .input(scormAiccSessionIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormAiccSession(input.id);
    }),
});
