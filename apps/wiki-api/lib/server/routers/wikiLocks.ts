import { getWikiLockById, getWikiLocks } from "@/lib/api/wikiLocks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiLockIdSchema,
  insertWikiLockParams,
  updateWikiLockParams,
} from "@/lib/db/schema/wikiLocks";
import { createWikiLock, deleteWikiLock, updateWikiLock } from "@/lib/api/wikiLocks/mutations";

export const wikiLocksRouter = router({
  getWikiLocks: publicProcedure.query(async () => {
    return getWikiLocks();
  }),
  getWikiLockById: publicProcedure.input(wikiLockIdSchema).query(async ({ input }) => {
    return getWikiLockById(input.id);
  }),
  createWikiLock: publicProcedure
    .input(insertWikiLockParams)
    .mutation(async ({ input }) => {
      return createWikiLock(input);
    }),
  updateWikiLock: publicProcedure
    .input(updateWikiLockParams)
    .mutation(async ({ input }) => {
      return updateWikiLock(input.id, input);
    }),
  deleteWikiLock: publicProcedure
    .input(wikiLockIdSchema)
    .mutation(async ({ input }) => {
      return deleteWikiLock(input.id);
    }),
});
