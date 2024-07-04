import {
  createAdminPreset,
  deleteAdminPreset,
  updateAdminPreset,
} from "../api/adminPresets/mutations";
import {
  getAdminPresetById,
  getAdminPresets,
} from "../api/adminPresets/queries";
import {
  adminPresetIdSchema,
  insertAdminPresetParams,
  updateAdminPresetParams,
} from "../db/schema/adminPresets";
import { publicProcedure, router } from "../server/trpc";

export const adminPresetsRouter = router({
  getAdminPresets: publicProcedure.query(async () => {
    return getAdminPresets();
  }),
  getAdminPresetById: publicProcedure
    .input(adminPresetIdSchema)
    .query(async ({ input }) => {
      return getAdminPresetById(input.id);
    }),
  createAdminPreset: publicProcedure
    .input(insertAdminPresetParams)
    .mutation(async ({ input }) => {
      return createAdminPreset(input);
    }),
  updateAdminPreset: publicProcedure
    .input(updateAdminPresetParams)
    .mutation(async ({ input }) => {
      return updateAdminPreset(input.id, input);
    }),
  deleteAdminPreset: publicProcedure
    .input(adminPresetIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminPreset(input.id);
    }),
});
