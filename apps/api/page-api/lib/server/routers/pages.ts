import { createPage, deletePage, updatePage } from "../api/pages/mutations";
import { getPageById, getPages } from "../api/pages/queries";
import {
  insertPageParams,
  pageIdSchema,
  updatePageParams,
} from "../db/schema/pages";
import { publicProcedure, router } from "../server/trpc";

export const pagesRouter = router({
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
