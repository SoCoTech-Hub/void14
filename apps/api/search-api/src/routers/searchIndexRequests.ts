import {
  insertSearchIndexRequestParams,
  searchIndexRequestIdSchema,
  updateSearchIndexRequestParams,
} from "@soco/search-db/schema/searchIndexRequests";

import {
  createSearchIndexRequest,
  deleteSearchIndexRequest,
  updateSearchIndexRequest,
} from "../api/searchIndexRequests/mutations";
import {
  getSearchIndexRequestById,
  getSearchIndexRequests,
} from "../api/searchIndexRequests/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const searchIndexRequestsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSearchIndexRequests: publicProcedure.query(async () => {
      return getSearchIndexRequests();
    }),
    getSearchIndexRequestById: publicProcedure
      .input(searchIndexRequestIdSchema)
      .query(async ({ input }) => {
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
