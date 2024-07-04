import { createWiki, deleteWiki, updateWiki } from "../api/wikis/mutations";
import { getWikiById, getWikis } from "../api/wikis/queries";
import {
  insertWikiParams,
  updateWikiParams,
  wikiIdSchema,
} from "../db/schema/wikis";
import { publicProcedure, router } from "../server/trpc";

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
