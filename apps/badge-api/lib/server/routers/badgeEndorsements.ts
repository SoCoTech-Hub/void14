import { getBadgeEndorsementById, getBadgeEndorsements } from "@/lib/api/badgeEndorsements/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeEndorsementIdSchema,
  insertBadgeEndorsementParams,
  updateBadgeEndorsementParams,
} from "@/lib/db/schema/badgeEndorsements";
import { createBadgeEndorsement, deleteBadgeEndorsement, updateBadgeEndorsement } from "@/lib/api/badgeEndorsements/mutations";

export const badgeEndorsementsRouter = router({
  getBadgeEndorsements: publicProcedure.query(async () => {
    return getBadgeEndorsements();
  }),
  getBadgeEndorsementById: publicProcedure.input(badgeEndorsementIdSchema).query(async ({ input }) => {
    return getBadgeEndorsementById(input.id);
  }),
  createBadgeEndorsement: publicProcedure
    .input(insertBadgeEndorsementParams)
    .mutation(async ({ input }) => {
      return createBadgeEndorsement(input);
    }),
  updateBadgeEndorsement: publicProcedure
    .input(updateBadgeEndorsementParams)
    .mutation(async ({ input }) => {
      return updateBadgeEndorsement(input.id, input);
    }),
  deleteBadgeEndorsement: publicProcedure
    .input(badgeEndorsementIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeEndorsement(input.id);
    }),
});
