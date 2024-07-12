import {
  insertWikiLinkParams,
  updateWikiLinkParams,
  wikiLinkIdSchema,
} from "@soco/wiki-db/schema/wikiLinks";

import {
  createWikiLink,
  deleteWikiLink,
  updateWikiLink,
} from "../api/wikiLinks/mutations";
import { getWikiLinkById, getWikiLinks } from "../api/wikiLinks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const wikiLinksRouter = createTRPCRouter({
  getWikiLinks: publicProcedure.query(async () => {
    return getWikiLinks();
  }),
  getWikiLinkById: publicProcedure
    .input(wikiLinkIdSchema)
    .query(async ({ input }) => {
      return getWikiLinkById(input.id);
    }),
  createWikiLink: publicProcedure
    .input(insertWikiLinkParams)
    .mutation(async ({ input }) => {
      return createWikiLink(input);
    }),
  updateWikiLink: publicProcedure
    .input(updateWikiLinkParams)
    .mutation(async ({ input }) => {
      return updateWikiLink(input.id, input);
    }),
  deleteWikiLink: publicProcedure
    .input(wikiLinkIdSchema)
    .mutation(async ({ input }) => {
      return deleteWikiLink(input.id);
    }),
});
