import {
  createWikiVersion,
  deleteWikiVersion,
  updateWikiVersion,
} from "../api/wikiVersions/mutations";
import {
  getWikiVersionById,
  getWikiVersions,
} from "../api/wikiVersions/queries";
import {
  insertWikiVersionParams,
  updateWikiVersionParams,
  wikiVersionIdSchema,
} from "../db/schema/wikiVersions";
import { publicProcedure, router } from "../server/trpc";

export const wikiVersionsRouter = router({
  getWikiVersions: publicProcedure.query(async () => {
    return getWikiVersions();
  }),
  getWikiVersionById: publicProcedure
    .input(wikiVersionIdSchema)
    .query(async ({ input }) => {
      return getWikiVersionById(input.id);
    }),
  createWikiVersion: publicProcedure
    .input(insertWikiVersionParams)
    .mutation(async ({ input }) => {
      return createWikiVersion(input);
    }),
  updateWikiVersion: publicProcedure
    .input(updateWikiVersionParams)
    .mutation(async ({ input }) => {
      return updateWikiVersion(input.id, input);
    }),
  deleteWikiVersion: publicProcedure
    .input(wikiVersionIdSchema)
    .mutation(async ({ input }) => {
      return deleteWikiVersion(input.id);
    }),
});
