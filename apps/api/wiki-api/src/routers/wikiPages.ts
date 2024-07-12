import {
  insertWikiPageParams,
  updateWikiPageParams,
  wikiPageIdSchema,
} from "@soco/wiki-db/schema/wikiPages";

import {
  createWikiPage,
  deleteWikiPage,
  updateWikiPage,
} from "../api/wikiPages/mutations";
import { getWikiPageById, getWikiPages } from "../api/wikiPages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const wikiPagesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
