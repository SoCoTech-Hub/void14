import { getSessionById, getSessions } from "../api/sessions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  sessionIdSchema,
  insertSessionParams,
  updateSessionParams,
} from "@soco/sessions-db/schema/sessions";
import { createSession, deleteSession, updateSession } from "../api/sessions/mutations";

export const sessionsRouter =createTRPCRouter({
  getSessions: publicProcedure.query(async () => {
    return getSessions();
  }),
  getSessionById: publicProcedure.input(sessionIdSchema).query(async ({ input }) => {
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
