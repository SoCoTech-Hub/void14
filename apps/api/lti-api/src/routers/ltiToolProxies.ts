import {
  insertLtiToolProxyParams,
  ltiToolProxyIdSchema,
  updateLtiToolProxyParams,
} from "@soco/lti-db/schema/ltiToolProxies";

import {
  createLtiToolProxy,
  deleteLtiToolProxy,
  updateLtiToolProxy,
} from "../api/ltiToolProxies/mutations";
import {
  getLtiToolProxies,
  getLtiToolProxyById,
} from "../api/ltiToolProxies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ltiToolProxiesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getLtiToolProxies: publicProcedure.query(async () => {
      return getLtiToolProxies();
    }),
    getLtiToolProxyById: publicProcedure
      .input(ltiToolProxyIdSchema)
      .query(async ({ input }) => {
        return getLtiToolProxyById(input.id);
      }),
    createLtiToolProxy: publicProcedure
      .input(insertLtiToolProxyParams)
      .mutation(async ({ input }) => {
        return createLtiToolProxy(input);
      }),
    updateLtiToolProxy: publicProcedure
      .input(updateLtiToolProxyParams)
      .mutation(async ({ input }) => {
        return updateLtiToolProxy(input.id, input);
      }),
    deleteLtiToolProxy: publicProcedure
      .input(ltiToolProxyIdSchema)
      .mutation(async ({ input }) => {
        return deleteLtiToolProxy(input.id);
      }),
  });
