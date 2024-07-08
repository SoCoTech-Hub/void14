import { getPageById, getPages } from "../api/pages/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  pageIdSchema,
  insertPageParams,
  updatePageParams,
} from "@soco/page-db/schema/pages";
import { createPage, deletePage, updatePage } from "../api/pages/mutations";

export const pagesRouter =createTRPCRouter({
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
