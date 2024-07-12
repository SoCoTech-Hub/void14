import {
  adminPresetItAIdSchema,
  insertAdminPresetItAParams,
  updateAdminPresetItAParams,
} from "@soco/admin-preset-db/schema/adminPresetItAs";

import {
  createAdminPresetItA,
  deleteAdminPresetItA,
  updateAdminPresetItA,
} from "../api/adminPresetItAs/mutations";
import {
  getAdminPresetItAById,
  getAdminPresetItAs,
} from "../api/adminPresetItAs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const adminPresetItAsRouter = createTRPCRouter({
  getAdminPresetItAs: publicProcedure.query(async () => {
    return getAdminPresetItAs();
  }),
  getAdminPresetItAById: publicProcedure
    .input(adminPresetItAIdSchema)
    .query(async ({ input }) => {
      return getAdminPresetItAById(input.id);
    }),
  createAdminPresetItA: publicProcedure
    .input(insertAdminPresetItAParams)
    .mutation(async ({ input }) => {
      return createAdminPresetItA(input);
    }),
  updateAdminPresetItA: publicProcedure
    .input(updateAdminPresetItAParams)
    .mutation(async ({ input }) => {
      return updateAdminPresetItA(input.id, input);
    }),
  deleteAdminPresetItA: publicProcedure
    .input(adminPresetItAIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminPresetItA(input.id);
    }),
});
