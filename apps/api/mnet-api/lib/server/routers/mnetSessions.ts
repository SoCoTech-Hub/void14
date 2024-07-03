import { getMnetSessionById, getMnetSessions } from "@/lib/api/mnetSessions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetSessionIdSchema,
  insertMnetSessionParams,
  updateMnetSessionParams,
} from "@/lib/db/schema/mnetSessions";
import { createMnetSession, deleteMnetSession, updateMnetSession } from "@/lib/api/mnetSessions/mutations";

export const mnetSessionsRouter = router({
  getMnetSessions: publicProcedure.query(async () => {
    return getMnetSessions();
  }),
  getMnetSessionById: publicProcedure.input(mnetSessionIdSchema).query(async ({ input }) => {
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
