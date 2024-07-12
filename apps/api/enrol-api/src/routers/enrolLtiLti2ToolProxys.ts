import {
  enrolLtiLti2ToolProxyIdSchema,
  insertEnrolLtiLti2ToolProxyParams,
  updateEnrolLtiLti2ToolProxyParams,
} from "@soco/enrol-db/schema/enrolLtiLti2ToolProxys";

import {
  createEnrolLtiLti2ToolProxy,
  deleteEnrolLtiLti2ToolProxy,
  updateEnrolLtiLti2ToolProxy,
} from "../api/enrolLtiLti2ToolProxys/mutations";
import {
  getEnrolLtiLti2ToolProxyById,
  getEnrolLtiLti2ToolProxys,
} from "../api/enrolLtiLti2ToolProxys/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolLtiLti2ToolProxysRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getEnrolLtiLti2ToolProxys: publicProcedure.query(async () => {
      return getEnrolLtiLti2ToolProxys();
    }),
    getEnrolLtiLti2ToolProxyById: publicProcedure
      .input(enrolLtiLti2ToolProxyIdSchema)
      .query(async ({ input }) => {
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
