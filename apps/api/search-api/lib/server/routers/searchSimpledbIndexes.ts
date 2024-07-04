import {
  createSearchSimpledbIndex,
  deleteSearchSimpledbIndex,
  updateSearchSimpledbIndex,
} from "../api/searchSimpledbIndexes/mutations";
import {
  getSearchSimpledbIndexById,
  getSearchSimpledbIndexes,
} from "../api/searchSimpledbIndexes/queries";
import {
  insertSearchSimpledbIndexParams,
  searchSimpledbIndexIdSchema,
  updateSearchSimpledbIndexParams,
} from "../db/schema/searchSimpledbIndexes";
import { publicProcedure, router } from "../server/trpc";

export const searchSimpledbIndexesRouter = router({
  getSearchSimpledbIndexes: publicProcedure.query(async () => {
    return getSearchSimpledbIndexes();
  }),
  getSearchSimpledbIndexById: publicProcedure
    .input(searchSimpledbIndexIdSchema)
    .query(async ({ input }) => {
      return getSearchSimpledbIndexById(input.id);
    }),
  createSearchSimpledbIndex: publicProcedure
    .input(insertSearchSimpledbIndexParams)
    .mutation(async ({ input }) => {
      return createSearchSimpledbIndex(input);
    }),
  updateSearchSimpledbIndex: publicProcedure
    .input(updateSearchSimpledbIndexParams)
    .mutation(async ({ input }) => {
      return updateSearchSimpledbIndex(input.id, input);
    }),
  deleteSearchSimpledbIndex: publicProcedure
    .input(searchSimpledbIndexIdSchema)
    .mutation(async ({ input }) => {
      return deleteSearchSimpledbIndex(input.id);
    }),
});
