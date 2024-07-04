import {
  createAdminPresetsApp,
  deleteAdminPresetsApp,
  updateAdminPresetsApp,
} from "../api/adminPresetsApps/mutations";
import {
  getAdminPresetsAppById,
  getAdminPresetsApps,
} from "../api/adminPresetsApps/queries";
import {
  adminPresetsAppIdSchema,
  insertAdminPresetsAppParams,
  updateAdminPresetsAppParams,
} from "../db/schema/adminPresetsApps";
import { publicProcedure, router } from "../server/trpc";

export const adminPresetsAppsRouter = router({
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
