import {
  createWikiSubwiki,
  deleteWikiSubwiki,
  updateWikiSubwiki,
} from "../api/wikiSubwikis/mutations";
import {
  getWikiSubwikiById,
  getWikiSubwikis,
} from "../api/wikiSubwikis/queries";
import {
  insertWikiSubwikiParams,
  updateWikiSubwikiParams,
  wikiSubwikiIdSchema,
} from "../db/schema/wikiSubwikis";
import { publicProcedure, router } from "../server/trpc";

export const wikiSubwikisRouter = router({
  getWikiSubwikis: publicProcedure.query(async () => {
    return getWikiSubwikis();
  }),
  getWikiSubwikiById: publicProcedure
    .input(wikiSubwikiIdSchema)
    .query(async ({ input }) => {
      return getWikiSubwikiById(input.id);
    }),
  createWikiSubwiki: publicProcedure
    .input(insertWikiSubwikiParams)
    .mutation(async ({ input }) => {
      return createWikiSubwiki(input);
    }),
  updateWikiSubwiki: publicProcedure
    .input(updateWikiSubwikiParams)
    .mutation(async ({ input }) => {
      return updateWikiSubwiki(input.id, input);
    }),
  deleteWikiSubwiki: publicProcedure
    .input(wikiSubwikiIdSchema)
    .mutation(async ({ input }) => {
      return deleteWikiSubwiki(input.id);
    }),
});
