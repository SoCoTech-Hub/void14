import { getWikiLockById, getWikiLocks } from "../api/wikiLocks/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  wikiLockIdSchema,
  insertWikiLockParams,
  updateWikiLockParams,
} from "@soco/wiki-db/schema/wikiLocks";
import { createWikiLock, deleteWikiLock, updateWikiLock } from "../api/wikiLocks/mutations";

export const wikiLocksRouter =createTRPCRouter({
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
