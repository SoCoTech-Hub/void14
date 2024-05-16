import { getWikiById, getWikis } from "@/lib/api/wikis/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiIdSchema,
  insertWikiParams,
  updateWikiParams,
} from "@/lib/db/schema/wikis";
import { createWiki, deleteWiki, updateWiki } from "@/lib/api/wikis/mutations";

export const wikisRouter = router({
  getWikis: publicProcedure.query(async () => {
    return getWikis();
  }),
  getWikiById: publicProcedure.input(wikiIdSchema).query(async ({ input }) => {
    return getWikiById(input.id);
  }),
  createWiki: publicProcedure
    .input(insertWikiParams)
    .mutation(async ({ input }) => {
      return createWiki(input);
    }),
  updateWiki: publicProcedure
    .input(updateWikiParams)
    .mutation(async ({ input }) => {
      return updateWiki(input.id, input);
    }),
  deleteWiki: publicProcedure
    .input(wikiIdSchema)
    .mutation(async ({ input }) => {
      return deleteWiki(input.id);
    }),
});
