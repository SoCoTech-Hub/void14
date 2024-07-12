import {
  badgeEndorsementIdSchema,
  insertBadgeEndorsementParams,
  updateBadgeEndorsementParams,
} from "@soco/badge-db/schema/badgeEndorsements";

import {
  createBadgeEndorsement,
  deleteBadgeEndorsement,
  updateBadgeEndorsement,
} from "../api/badgeEndorsements/mutations";
import {
  getBadgeEndorsementById,
  getBadgeEndorsements,
} from "../api/badgeEndorsements/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const badgeEndorsementsRouter = createTRPCRouter({
  getBadgeEndorsements: publicProcedure.query(async () => {
    return getBadgeEndorsements();
  }),
  getBadgeEndorsementById: publicProcedure
    .input(badgeEndorsementIdSchema)
    .query(async ({ input }) => {
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
