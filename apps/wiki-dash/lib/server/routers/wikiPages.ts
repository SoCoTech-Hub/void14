import { getWikiPageById, getWikiPages } from "@/lib/api/wikiPages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiPageIdSchema,
  insertWikiPageParams,
  updateWikiPageParams,
} from "@/lib/db/schema/wikiPages";
import { createWikiPage, deleteWikiPage, updateWikiPage } from "@/lib/api/wikiPages/mutations";

export const wikiPagesRouter = router({
  getWikiPages: publicProcedure.query(async () => {
    return getWikiPages();
  }),
  getWikiPageById: publicProcedure.input(wikiPageIdSchema).query(async ({ input }) => {
    return getWikiPageById(input.id);
  }),
  createWikiPage: publicProcedure
    .input(insertWikiPageParams)
    .mutation(async ({ input }) => {
      return createWikiPage(input);
    }),
  updateWikiPage: publicProcedure
    .input(updateWikiPageParams)
    .mutation(async ({ input }) => {
      return updateWikiPage(input.id, input);
    }),
  deleteWikiPage: publicProcedure
    .input(wikiPageIdSchema)
    .mutation(async ({ input }) => {
      return deleteWikiPage(input.id);
    }),
});
