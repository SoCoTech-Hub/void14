import {
  insertPageParams,
  pageIdSchema,
  updatePageParams,
} from "@soco/page-db/schema/pages";

import { createPage, deletePage, updatePage } from "../api/pages/mutations";
import { getPageById, getPages } from "../api/pages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const pagesRouter = createTRPCRouter({
  getPages: publicProcedure.query(async () => {
    return getPages();
  }),
  getPageById: publicProcedure.input(pageIdSchema).query(async ({ input }) => {
    return getPageById(input.id);
  }),
  createPage: publicProcedure
    .input(insertPageParams)
    .mutation(async ({ input }) => {
      return createPage(input);
    }),
  updatePage: publicProcedure
    .input(updatePageParams)
    .mutation(async ({ input }) => {
      return updatePage(input.id, input);
    }),
  deletePage: publicProcedure
    .input(pageIdSchema)
    .mutation(async ({ input }) => {
      return deletePage(input.id);
    }),
});
