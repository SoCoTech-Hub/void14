import {
  createAdminPresetIt,
  deleteAdminPresetIt,
  updateAdminPresetIt,
} from "../api/adminPresetIts/mutations";
import {
  getAdminPresetItById,
  getAdminPresetIts,
} from "../api/adminPresetIts/queries";
import {
  adminPresetItIdSchema,
  insertAdminPresetItParams,
  updateAdminPresetItParams,
} from "../db/schema/adminPresetIts";
import { publicProcedure, router } from "../server/trpc";

export const adminPresetItsRouter = router({
  getAdminPresetIts: publicProcedure.query(async () => {
    return getAdminPresetIts();
  }),
  getAdminPresetItById: publicProcedure
    .input(adminPresetItIdSchema)
    .query(async ({ input }) => {
      return getAdminPresetItById(input.id);
    }),
  createAdminPresetIt: publicProcedure
    .input(insertAdminPresetItParams)
    .mutation(async ({ input }) => {
      return createAdminPresetIt(input);
    }),
  updateAdminPresetIt: publicProcedure
    .input(updateAdminPresetItParams)
    .mutation(async ({ input }) => {
      return updateAdminPresetIt(input.id, input);
    }),
  deleteAdminPresetIt: publicProcedure
    .input(adminPresetItIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminPresetIt(input.id);
    }),
});
