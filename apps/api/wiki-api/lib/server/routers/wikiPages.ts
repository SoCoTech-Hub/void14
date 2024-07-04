import {
  createWikiPage,
  deleteWikiPage,
  updateWikiPage,
} from "../api/wikiPages/mutations";
import { getWikiPageById, getWikiPages } from "../api/wikiPages/queries";
import {
  insertWikiPageParams,
  updateWikiPageParams,
  wikiPageIdSchema,
} from "../db/schema/wikiPages";
import { publicProcedure, router } from "../server/trpc";

export const wikiPagesRouter = router({
  getWikiPages: publicProcedure.query(async () => {
    return getWikiPages();
  }),
  getWikiPageById: publicProcedure
    .input(wikiPageIdSchema)
    .query(async ({ input }) => {
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
