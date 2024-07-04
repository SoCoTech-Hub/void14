import {
  createAdminpresetsAppIt,
  deleteAdminpresetsAppIt,
  updateAdminpresetsAppIt,
} from "../api/adminpresetsAppIts/mutations";
import {
  getAdminpresetsAppItById,
  getAdminpresetsAppIts,
} from "../api/adminpresetsAppIts/queries";
import {
  adminpresetsAppItIdSchema,
  insertAdminpresetsAppItParams,
  updateAdminpresetsAppItParams,
} from "../db/schema/adminpresetsAppIts";
import { publicProcedure, router } from "../server/trpc";

export const adminpresetsAppItsRouter = router({
  getAdminpresetsAppIts: publicProcedure.query(async () => {
    return getAdminpresetsAppIts();
  }),
  getAdminpresetsAppItById: publicProcedure
    .input(adminpresetsAppItIdSchema)
    .query(async ({ input }) => {
      return getAdminpresetsAppItById(input.id);
    }),
  createAdminpresetsAppIt: publicProcedure
    .input(insertAdminpresetsAppItParams)
    .mutation(async ({ input }) => {
      return createAdminpresetsAppIt(input);
    }),
  updateAdminpresetsAppIt: publicProcedure
    .input(updateAdminpresetsAppItParams)
    .mutation(async ({ input }) => {
      return updateAdminpresetsAppIt(input.id, input);
    }),
  deleteAdminpresetsAppIt: publicProcedure
    .input(adminpresetsAppItIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminpresetsAppIt(input.id);
    }),
});
