import {
  createSession,
  deleteSession,
  updateSession,
} from "../api/sessions/mutations";
import { getSessionById, getSessions } from "../api/sessions/queries";
import {
  insertSessionParams,
  sessionIdSchema,
  updateSessionParams,
} from "../db/schema/sessions";
import { publicProcedure, router } from "../server/trpc";

export const sessionsRouter = router({
  getSessions: publicProcedure.query(async () => {
    return getSessions();
  }),
  getSessionById: publicProcedure
    .input(sessionIdSchema)
    .query(async ({ input }) => {
      return getSessionById(input.id);
    }),
  createSession: publicProcedure
    .input(insertSessionParams)
    .mutation(async ({ input }) => {
      return createSession(input);
    }),
  updateSession: publicProcedure
    .input(updateSessionParams)
    .mutation(async ({ input }) => {
      return updateSession(input.id, input);
    }),
  deleteSession: publicProcedure
    .input(sessionIdSchema)
    .mutation(async ({ input }) => {
      return deleteSession(input.id);
    }),
});
