import {
  adminPresetIdSchema,
  insertAdminPresetParams,
  updateAdminPresetParams,
} from "@soco/admin-preset-db/schema/adminPresets";

import {
  createAdminPreset,
  deleteAdminPreset,
  updateAdminPreset,
} from "../api/adminPresets/mutations";
import {
  getAdminPresetById,
  getAdminPresets,
} from "../api/adminPresets/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const adminPresetsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
