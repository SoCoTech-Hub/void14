import {
  createAdminPresetItA,
  deleteAdminPresetItA,
  updateAdminPresetItA,
} from "../api/adminPresetItAs/mutations";
import {
  getAdminPresetItAById,
  getAdminPresetItAs,
} from "../api/adminPresetItAs/queries";
import {
  adminPresetItAIdSchema,
  insertAdminPresetItAParams,
  updateAdminPresetItAParams,
} from "../db/schema/adminPresetItAs";
import { publicProcedure, router } from "../server/trpc";

export const adminPresetItAsRouter = router({
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
