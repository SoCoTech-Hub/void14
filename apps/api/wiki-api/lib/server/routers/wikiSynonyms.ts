import { getWikiSynonymById, getWikiSynonyms } from "@/lib/api/wikiSynonyms/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiSynonymIdSchema,
  insertWikiSynonymParams,
  updateWikiSynonymParams,
} from "@/lib/db/schema/wikiSynonyms";
import { createWikiSynonym, deleteWikiSynonym, updateWikiSynonym } from "@/lib/api/wikiSynonyms/mutations";

export const wikiSynonymsRouter = router({
  getWikiSynonyms: publicProcedure.query(async () => {
    return getWikiSynonyms();
  }),
  getWikiSynonymById: publicProcedure.input(wikiSynonymIdSchema).query(async ({ input }) => {
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
