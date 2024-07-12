import {
  insertWikiParams,
  updateWikiParams,
  wikiIdSchema,
} from "@soco/wiki-db/schema/wikis";

import { createWiki, deleteWiki, updateWiki } from "../api/wikis/mutations";
import { getWikiById, getWikis } from "../api/wikis/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const wikisRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getWikis: publicProcedure.query(async () => {
      return getWikis();
    }),
    getWikiById: publicProcedure
      .input(wikiIdSchema)
      .query(async ({ input }) => {
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
