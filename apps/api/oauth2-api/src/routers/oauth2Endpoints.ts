import {
  insertOauth2EndpointParams,
  oauth2EndpointIdSchema,
  updateOauth2EndpointParams,
} from "@soco/oauth2-db/schema/oauth2Endpoints";

import {
  createOauth2Endpoint,
  deleteOauth2Endpoint,
  updateOauth2Endpoint,
} from "../api/oauth2Endpoints/mutations";
import {
  getOauth2EndpointById,
  getOauth2Endpoints,
} from "../api/oauth2Endpoints/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const oauth2EndpointsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getOauth2Endpoints: publicProcedure.query(async () => {
      return getOauth2Endpoints();
    }),
    getOauth2EndpointById: publicProcedure
      .input(oauth2EndpointIdSchema)
      .query(async ({ input }) => {
        return getOauth2EndpointById(input.id);
      }),
    createOauth2Endpoint: publicProcedure
      .input(insertOauth2EndpointParams)
      .mutation(async ({ input }) => {
        return createOauth2Endpoint(input);
      }),
    updateOauth2Endpoint: publicProcedure
      .input(updateOauth2EndpointParams)
      .mutation(async ({ input }) => {
        return updateOauth2Endpoint(input.id, input);
      }),
    deleteOauth2Endpoint: publicProcedure
      .input(oauth2EndpointIdSchema)
      .mutation(async ({ input }) => {
        return deleteOauth2Endpoint(input.id);
      }),
  });
