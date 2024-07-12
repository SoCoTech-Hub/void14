import {
  adminPresetsAppIdSchema,
  insertAdminPresetsAppParams,
  updateAdminPresetsAppParams,
} from "@soco/admin-preset-db/schema/adminPresetsApps";

import {
  createAdminPresetsApp,
  deleteAdminPresetsApp,
  updateAdminPresetsApp,
} from "../api/adminPresetsApps/mutations";
import {
  getAdminPresetsAppById,
  getAdminPresetsApps,
} from "../api/adminPresetsApps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const adminPresetsAppsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAdminPresetsApps: publicProcedure.query(async () => {
      return getAdminPresetsApps();
    }),
    getAdminPresetsAppById: publicProcedure
      .input(adminPresetsAppIdSchema)
      .query(async ({ input }) => {
        return getAdminPresetsAppById(input.id);
      }),
    createAdminPresetsApp: publicProcedure
      .input(insertAdminPresetsAppParams)
      .mutation(async ({ input }) => {
        return createAdminPresetsApp(input);
      }),
    updateAdminPresetsApp: publicProcedure
      .input(updateAdminPresetsAppParams)
      .mutation(async ({ input }) => {
        return updateAdminPresetsApp(input.id, input);
      }),
    deleteAdminPresetsApp: publicProcedure
      .input(adminPresetsAppIdSchema)
      .mutation(async ({ input }) => {
        return deleteAdminPresetsApp(input.id);
      }),
  });
