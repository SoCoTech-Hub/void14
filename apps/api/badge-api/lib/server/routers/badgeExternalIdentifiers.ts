import {
  createBadgeExternalIdentifier,
  deleteBadgeExternalIdentifier,
  updateBadgeExternalIdentifier,
} from "../api/badgeExternalIdentifiers/mutations";
import {
  getBadgeExternalIdentifierById,
  getBadgeExternalIdentifiers,
} from "../api/badgeExternalIdentifiers/queries";
import {
  badgeExternalIdentifierIdSchema,
  insertBadgeExternalIdentifierParams,
  updateBadgeExternalIdentifierParams,
} from "../db/schema/badgeExternalIdentifiers";
import { publicProcedure, router } from "../server/trpc";

export const badgeExternalIdentifiersRouter = router({
  getBadgeExternalIdentifiers: publicProcedure.query(async () => {
    return getBadgeExternalIdentifiers();
  }),
  getBadgeExternalIdentifierById: publicProcedure
    .input(badgeExternalIdentifierIdSchema)
    .query(async ({ input }) => {
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
