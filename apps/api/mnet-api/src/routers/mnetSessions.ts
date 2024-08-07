import {
  insertMnetSessionParams,
  mnetSessionIdSchema,
  updateMnetSessionParams,
} from "@soco/mnet-db/schema/mnetSessions";

import {
  createMnetSession,
  deleteMnetSession,
  updateMnetSession,
} from "../api/mnetSessions/mutations";
import {
  getMnetSessionById,
  getMnetSessions,
} from "../api/mnetSessions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mnetSessionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMnetSessions: publicProcedure.query(async () => {
      return getMnetSessions();
    }),
    getMnetSessionById: publicProcedure
      .input(mnetSessionIdSchema)
      .query(async ({ input }) => {
        return getMnetSessionById(input.id);
      }),
    createMnetSession: publicProcedure
      .input(insertMnetSessionParams)
      .mutation(async ({ input }) => {
        return createMnetSession(input);
      }),
    updateMnetSession: publicProcedure
      .input(updateMnetSessionParams)
      .mutation(async ({ input }) => {
        return updateMnetSession(input.id, input);
      }),
    deleteMnetSession: publicProcedure
      .input(mnetSessionIdSchema)
      .mutation(async ({ input }) => {
        return deleteMnetSession(input.id);
      }),
  });
