import { getLtiToolProxyById, getLtiToolProxies } from "@/lib/api/ltiToolProxies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiToolProxyIdSchema,
  insertLtiToolProxyParams,
  updateLtiToolProxyParams,
} from "@/lib/db/schema/ltiToolProxies";
import { createLtiToolProxy, deleteLtiToolProxy, updateLtiToolProxy } from "@/lib/api/ltiToolProxies/mutations";

export const ltiToolProxiesRouter = router({
  getLtiToolProxies: publicProcedure.query(async () => {
    return getLtiToolProxies();
  }),
  getLtiToolProxyById: publicProcedure.input(ltiToolProxyIdSchema).query(async ({ input }) => {
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
