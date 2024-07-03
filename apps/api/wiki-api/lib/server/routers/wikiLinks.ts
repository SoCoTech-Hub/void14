import { getWikiLinkById, getWikiLinks } from "@/lib/api/wikiLinks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  wikiLinkIdSchema,
  insertWikiLinkParams,
  updateWikiLinkParams,
} from "@/lib/db/schema/wikiLinks";
import { createWikiLink, deleteWikiLink, updateWikiLink } from "@/lib/api/wikiLinks/mutations";

export const wikiLinksRouter = router({
  getWikiLinks: publicProcedure.query(async () => {
    return getWikiLinks();
  }),
  getWikiLinkById: publicProcedure.input(wikiLinkIdSchema).query(async ({ input }) => {
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
