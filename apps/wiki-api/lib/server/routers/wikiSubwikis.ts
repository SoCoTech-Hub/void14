import { getWikiSubwikiById, getWikiSubwikis } from "@/lib/api/wikiSubwikis/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiSubwikiIdSchema,
  insertWikiSubwikiParams,
  updateWikiSubwikiParams,
} from "@/lib/db/schema/wikiSubwikis";
import { createWikiSubwiki, deleteWikiSubwiki, updateWikiSubwiki } from "@/lib/api/wikiSubwikis/mutations";

export const wikiSubwikisRouter = router({
  getWikiSubwikis: publicProcedure.query(async () => {
    return getWikiSubwikis();
  }),
  getWikiSubwikiById: publicProcedure.input(wikiSubwikiIdSchema).query(async ({ input }) => {
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
