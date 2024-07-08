import { getWikiSubwikiById, getWikiSubwikis } from "../api/wikiSubwikis/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  wikiSubwikiIdSchema,
  insertWikiSubwikiParams,
  updateWikiSubwikiParams,
} from "@soco/wiki-db/schema/wikiSubwikis";
import { createWikiSubwiki, deleteWikiSubwiki, updateWikiSubwiki } from "../api/wikiSubwikis/mutations";

export const wikiSubwikisRouter =createTRPCRouter({
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
