import {
  insertLockDbParams,
  lockDbIdSchema,
  updateLockDbParams,
} from "@soco/lock-db/schema/lockDbs";

import {
  createLockDb,
  deleteLockDb,
  updateLockDb,
} from "../api/lockDbs/mutations";
import { getLockDbById, getLockDbs } from "../api/lockDbs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const lockDbsRouter = createTRPCRouter({
  getLockDbs: publicProcedure.query(async () => {
    return getLockDbs();
  }),
  getLockDbById: publicProcedure
    .input(lockDbIdSchema)
    .query(async ({ input }) => {
      return getLockDbById(input.id);
    }),
  createLockDb: publicProcedure
    .input(insertLockDbParams)
    .mutation(async ({ input }) => {
      return createLockDb(input);
    }),
  updateLockDb: publicProcedure
    .input(updateLockDbParams)
    .mutation(async ({ input }) => {
      return updateLockDb(input.id, input);
    }),
  deleteLockDb: publicProcedure
    .input(lockDbIdSchema)
    .mutation(async ({ input }) => {
      return deleteLockDb(input.id);
    }),
});
