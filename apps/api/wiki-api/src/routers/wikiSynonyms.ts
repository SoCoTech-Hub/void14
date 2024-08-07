import {
  insertWikiSynonymParams,
  updateWikiSynonymParams,
  wikiSynonymIdSchema,
} from "@soco/wiki-db/schema/wikiSynonyms";

import {
  createWikiSynonym,
  deleteWikiSynonym,
  updateWikiSynonym,
} from "../api/wikiSynonyms/mutations";
import {
  getWikiSynonymById,
  getWikiSynonyms,
} from "../api/wikiSynonyms/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const wikiSynonymsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getWikiSynonyms: publicProcedure.query(async () => {
      return getWikiSynonyms();
    }),
    getWikiSynonymById: publicProcedure
      .input(wikiSynonymIdSchema)
      .query(async ({ input }) => {
        return getWikiSynonymById(input.id);
      }),
    createWikiSynonym: publicProcedure
      .input(insertWikiSynonymParams)
      .mutation(async ({ input }) => {
        return createWikiSynonym(input);
      }),
    updateWikiSynonym: publicProcedure
      .input(updateWikiSynonymParams)
      .mutation(async ({ input }) => {
        return updateWikiSynonym(input.id, input);
      }),
    deleteWikiSynonym: publicProcedure
      .input(wikiSynonymIdSchema)
      .mutation(async ({ input }) => {
        return deleteWikiSynonym(input.id);
      }),
  });
