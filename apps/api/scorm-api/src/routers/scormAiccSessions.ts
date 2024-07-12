import {
  insertScormAiccSessionParams,
  scormAiccSessionIdSchema,
  updateScormAiccSessionParams,
} from "@soco/scorm-db/schema/scormAiccSessions";

import {
  createScormAiccSession,
  deleteScormAiccSession,
  updateScormAiccSession,
} from "../api/scormAiccSessions/mutations";
import {
  getScormAiccSessionById,
  getScormAiccSessions,
} from "../api/scormAiccSessions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormAiccSessionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
