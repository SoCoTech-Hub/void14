import {
  createLockDb,
  deleteLockDb,
  updateLockDb,
} from "../api/lockDbs/mutations";
import { getLockDbById, getLockDbs } from "../api/lockDbs/queries";
import {
  insertLockDbParams,
  lockDbIdSchema,
  updateLockDbParams,
} from "../db/schema/lockDbs";
import { publicProcedure, router } from "../server/trpc";

export const lockDbsRouter = router({
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
