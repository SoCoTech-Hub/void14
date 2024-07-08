import { getSearchIndexRequestById, getSearchIndexRequests } from "../api/searchIndexRequests/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  searchIndexRequestIdSchema,
  insertSearchIndexRequestParams,
  updateSearchIndexRequestParams,
} from "@soco/search-db/schema/searchIndexRequests";
import { createSearchIndexRequest, deleteSearchIndexRequest, updateSearchIndexRequest } from "../api/searchIndexRequests/mutations";

export const searchIndexRequestsRouter =createTRPCRouter({
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
