import {
  createAdminPresetPlug,
  deleteAdminPresetPlug,
  updateAdminPresetPlug,
} from "../api/adminPresetPlugs/mutations";
import {
  getAdminPresetPlugById,
  getAdminPresetPlugs,
} from "../api/adminPresetPlugs/queries";
import {
  adminPresetPlugIdSchema,
  insertAdminPresetPlugParams,
  updateAdminPresetPlugParams,
} from "../db/schema/adminPresetPlugs";
import { publicProcedure, router } from "../server/trpc";

export const adminPresetPlugsRouter = router({
  getAdminPresetPlugs: publicProcedure.query(async () => {
    return getAdminPresetPlugs();
  }),
  getAdminPresetPlugById: publicProcedure
    .input(adminPresetPlugIdSchema)
    .query(async ({ input }) => {
      return getAdminPresetPlugById(input.id);
    }),
  createAdminPresetPlug: publicProcedure
    .input(insertAdminPresetPlugParams)
    .mutation(async ({ input }) => {
      return createAdminPresetPlug(input);
    }),
  updateAdminPresetPlug: publicProcedure
    .input(updateAdminPresetPlugParams)
    .mutation(async ({ input }) => {
      return updateAdminPresetPlug(input.id, input);
    }),
  deleteAdminPresetPlug: publicProcedure
    .input(adminPresetPlugIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminPresetPlug(input.id);
    }),
});
