import { getLockDbById, getLockDbs } from "@/lib/api/lockDbs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lockDbIdSchema,
  insertLockDbParams,
  updateLockDbParams,
} from "@/lib/db/schema/lockDbs";
import { createLockDb, deleteLockDb, updateLockDb } from "@/lib/api/lockDbs/mutations";

export const lockDbsRouter = router({
  getLockDbs: publicProcedure.query(async () => {
    return getLockDbs();
  }),
  getLockDbById: publicProcedure.input(lockDbIdSchema).query(async ({ input }) => {
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
