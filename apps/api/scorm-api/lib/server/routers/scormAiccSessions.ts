import { getScormAiccSessionById, getScormAiccSessions } from "@/lib/api/scormAiccSessions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormAiccSessionIdSchema,
  insertScormAiccSessionParams,
  updateScormAiccSessionParams,
} from "@/lib/db/schema/scormAiccSessions";
import { createScormAiccSession, deleteScormAiccSession, updateScormAiccSession } from "@/lib/api/scormAiccSessions/mutations";

export const scormAiccSessionsRouter = router({
  getScormAiccSessions: publicProcedure.query(async () => {
    return getScormAiccSessions();
  }),
  getScormAiccSessionById: publicProcedure.input(scormAiccSessionIdSchema).query(async ({ input }) => {
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
