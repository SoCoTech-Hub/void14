import { getEnrolLtiLti2ToolProxyById, getEnrolLtiLti2ToolProxys } from "@/lib/api/enrolLtiLti2ToolProxys/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiLti2ToolProxyIdSchema,
  insertEnrolLtiLti2ToolProxyParams,
  updateEnrolLtiLti2ToolProxyParams,
} from "@/lib/db/schema/enrolLtiLti2ToolProxys";
import { createEnrolLtiLti2ToolProxy, deleteEnrolLtiLti2ToolProxy, updateEnrolLtiLti2ToolProxy } from "@/lib/api/enrolLtiLti2ToolProxys/mutations";

export const enrolLtiLti2ToolProxysRouter = router({
  getEnrolLtiLti2ToolProxys: publicProcedure.query(async () => {
    return getEnrolLtiLti2ToolProxys();
  }),
  getEnrolLtiLti2ToolProxyById: publicProcedure.input(enrolLtiLti2ToolProxyIdSchema).query(async ({ input }) => {
    return getEnrolLtiLti2ToolProxyById(input.id);
  }),
  createEnrolLtiLti2ToolProxy: publicProcedure
    .input(insertEnrolLtiLti2ToolProxyParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2ToolProxy(input);
    }),
  updateEnrolLtiLti2ToolProxy: publicProcedure
    .input(updateEnrolLtiLti2ToolProxyParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2ToolProxy(input.id, input);
    }),
  deleteEnrolLtiLti2ToolProxy: publicProcedure
    .input(enrolLtiLti2ToolProxyIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2ToolProxy(input.id);
    }),
});
