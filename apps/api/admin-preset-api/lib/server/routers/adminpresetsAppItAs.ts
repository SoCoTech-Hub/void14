import {
  createAdminpresetsAppItA,
  deleteAdminpresetsAppItA,
  updateAdminpresetsAppItA,
} from "../api/adminpresetsAppItAs/mutations";
import {
  getAdminpresetsAppItAById,
  getAdminpresetsAppItAs,
} from "../api/adminpresetsAppItAs/queries";
import {
  adminpresetsAppItAIdSchema,
  insertAdminpresetsAppItAParams,
  updateAdminpresetsAppItAParams,
} from "../db/schema/adminpresetsAppItAs";
import { publicProcedure, router } from "../server/trpc";

export const adminpresetsAppItAsRouter = router({
  getAdminpresetsAppItAs: publicProcedure.query(async () => {
    return getAdminpresetsAppItAs();
  }),
  getAdminpresetsAppItAById: publicProcedure
    .input(adminpresetsAppItAIdSchema)
    .query(async ({ input }) => {
      return getAdminpresetsAppItAById(input.id);
    }),
  createAdminpresetsAppItA: publicProcedure
    .input(insertAdminpresetsAppItAParams)
    .mutation(async ({ input }) => {
      return createAdminpresetsAppItA(input);
    }),
  updateAdminpresetsAppItA: publicProcedure
    .input(updateAdminpresetsAppItAParams)
    .mutation(async ({ input }) => {
      return updateAdminpresetsAppItA(input.id, input);
    }),
  deleteAdminpresetsAppItA: publicProcedure
    .input(adminpresetsAppItAIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdminpresetsAppItA(input.id);
    }),
});
