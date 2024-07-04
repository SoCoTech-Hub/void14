import {
  createWikiLock,
  deleteWikiLock,
  updateWikiLock,
} from "../api/wikiLocks/mutations";
import { getWikiLockById, getWikiLocks } from "../api/wikiLocks/queries";
import {
  insertWikiLockParams,
  updateWikiLockParams,
  wikiLockIdSchema,
} from "../db/schema/wikiLocks";
import { publicProcedure, router } from "../server/trpc";

export const wikiLocksRouter = router({
  getWikiLocks: publicProcedure.query(async () => {
    return getWikiLocks();
  }),
  getWikiLockById: publicProcedure
    .input(wikiLockIdSchema)
    .query(async ({ input }) => {
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
