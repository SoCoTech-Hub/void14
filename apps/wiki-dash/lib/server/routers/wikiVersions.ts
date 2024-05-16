import { getWikiVersionById, getWikiVersions } from "@/lib/api/wikiVersions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiVersionIdSchema,
  insertWikiVersionParams,
  updateWikiVersionParams,
} from "@/lib/db/schema/wikiVersions";
import { createWikiVersion, deleteWikiVersion, updateWikiVersion } from "@/lib/api/wikiVersions/mutations";

export const wikiVersionsRouter = router({
  getWikiVersions: publicProcedure.query(async () => {
    return getWikiVersions();
  }),
  getWikiVersionById: publicProcedure.input(wikiVersionIdSchema).query(async ({ input }) => {
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
