import { getSearchIndexRequestById, getSearchIndexRequests } from "@/lib/api/searchIndexRequests/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  searchIndexRequestIdSchema,
  insertSearchIndexRequestParams,
  updateSearchIndexRequestParams,
} from "@/lib/db/schema/searchIndexRequests";
import { createSearchIndexRequest, deleteSearchIndexRequest, updateSearchIndexRequest } from "@/lib/api/searchIndexRequests/mutations";

export const searchIndexRequestsRouter = router({
  getSearchIndexRequests: publicProcedure.query(async () => {
    return getSearchIndexRequests();
  }),
  getSearchIndexRequestById: publicProcedure.input(searchIndexRequestIdSchema).query(async ({ input }) => {
    return getSearchIndexRequestById(input.id);
  }),
  createSearchIndexRequest: publicProcedure
    .input(insertSearchIndexRequestParams)
    .mutation(async ({ input }) => {
      return createSearchIndexRequest(input);
    }),
  updateSearchIndexRequest: publicProcedure
    .input(updateSearchIndexRequestParams)
    .mutation(async ({ input }) => {
      return updateSearchIndexRequest(input.id, input);
    }),
  deleteSearchIndexRequest: publicProcedure
    .input(searchIndexRequestIdSchema)
    .mutation(async ({ input }) => {
      return deleteSearchIndexRequest(input.id);
    }),
});
