import { getSearchSimpledbIndexById, getSearchSimpledbIndexes } from "@/lib/api/searchSimpledbIndexes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  searchSimpledbIndexIdSchema,
  insertSearchSimpledbIndexParams,
  updateSearchSimpledbIndexParams,
} from "@/lib/db/schema/searchSimpledbIndexes";
import { createSearchSimpledbIndex, deleteSearchSimpledbIndex, updateSearchSimpledbIndex } from "@/lib/api/searchSimpledbIndexes/mutations";

export const searchSimpledbIndexesRouter = router({
  getSearchSimpledbIndexes: publicProcedure.query(async () => {
    return getSearchSimpledbIndexes();
  }),
  getSearchSimpledbIndexById: publicProcedure.input(searchSimpledbIndexIdSchema).query(async ({ input }) => {
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
