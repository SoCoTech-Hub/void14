import {
  createAdminPresetAppPlug,
  deleteAdminPresetAppPlug,
  updateAdminPresetAppPlug,
} from "../api/adminPresetAppPlugs/mutations";
import {
  getAdminPresetAppPlugById,
  getAdminPresetAppPlugs,
} from "../api/adminPresetAppPlugs/queries";
import {
  adminPresetAppPlugIdSchema,
  insertAdminPresetAppPlugParams,
  updateAdminPresetAppPlugParams,
} from "../db/schema/adminPresetAppPlugs";
import { publicProcedure, router } from "../server/trpc";

export const adminPresetAppPlugsRouter = router({
  getAdminPresetAppPlugs: publicProcedure.query(async () => {
    return getAdminPresetAppPlugs();
  }),
  getAdminPresetAppPlugById: publicProcedure
    .input(adminPresetAppPlugIdSchema)
    .query(async ({ input }) => {
      return getAdminPresetAppPlugById(input.id);
    }),
  createAdminPresetAppPlug: publicProcedure
    .input(insertAdminPresetAppPlugParams)
    .mutation(async ({ input }) => {
      return createAdminPresetAppPlug(input);
    }),
  updateAdminPresetAppPlug: publicProcedure
    .input(updateAdminPresetAppPlugParams)
    .mutation(async ({ input }) => {
      return updateAdminPresetAppPlug(input.id, input);
    }),
  deleteAdminPresetAppPlug: publicProcedure
    .input(adminPresetAppPlugIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminPresetAppPlug(input.id);
    }),
});
