import { getBadgeExternalIdentifierById, getBadgeExternalIdentifiers } from "@/lib/api/badgeExternalIdentifiers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeExternalIdentifierIdSchema,
  insertBadgeExternalIdentifierParams,
  updateBadgeExternalIdentifierParams,
} from "@/lib/db/schema/badgeExternalIdentifiers";
import { createBadgeExternalIdentifier, deleteBadgeExternalIdentifier, updateBadgeExternalIdentifier } from "@/lib/api/badgeExternalIdentifiers/mutations";

export const badgeExternalIdentifiersRouter = router({
  getBadgeExternalIdentifiers: publicProcedure.query(async () => {
    return getBadgeExternalIdentifiers();
  }),
  getBadgeExternalIdentifierById: publicProcedure.input(badgeExternalIdentifierIdSchema).query(async ({ input }) => {
    return getBadgeExternalIdentifierById(input.id);
  }),
  createBadgeExternalIdentifier: publicProcedure
    .input(insertBadgeExternalIdentifierParams)
    .mutation(async ({ input }) => {
      return createBadgeExternalIdentifier(input);
    }),
  updateBadgeExternalIdentifier: publicProcedure
    .input(updateBadgeExternalIdentifierParams)
    .mutation(async ({ input }) => {
      return updateBadgeExternalIdentifier(input.id, input);
    }),
  deleteBadgeExternalIdentifier: publicProcedure
    .input(badgeExternalIdentifierIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeExternalIdentifier(input.id);
    }),
});
