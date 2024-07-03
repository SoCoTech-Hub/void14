import { getBadgeExternalById, getBadgeExternals } from "@/lib/api/badgeExternals/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeExternalIdSchema,
  insertBadgeExternalParams,
  updateBadgeExternalParams,
} from "@/lib/db/schema/badgeExternals";
import { createBadgeExternal, deleteBadgeExternal, updateBadgeExternal } from "@/lib/api/badgeExternals/mutations";

export const badgeExternalsRouter = router({
  getBadgeExternals: publicProcedure.query(async () => {
    return getBadgeExternals();
  }),
  getBadgeExternalById: publicProcedure.input(badgeExternalIdSchema).query(async ({ input }) => {
    return getBadgeExternalById(input.id);
  }),
  createBadgeExternal: publicProcedure
    .input(insertBadgeExternalParams)
    .mutation(async ({ input }) => {
      return createBadgeExternal(input);
    }),
  updateBadgeExternal: publicProcedure
    .input(updateBadgeExternalParams)
    .mutation(async ({ input }) => {
      return updateBadgeExternal(input.id, input);
    }),
  deleteBadgeExternal: publicProcedure
    .input(badgeExternalIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeExternal(input.id);
    }),
});
