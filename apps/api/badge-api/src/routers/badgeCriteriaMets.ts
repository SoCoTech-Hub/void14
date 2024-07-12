import {
  badgeCriteriaMetIdSchema,
  insertBadgeCriteriaMetParams,
  updateBadgeCriteriaMetParams,
} from "@soco/badge-db/schema/badgeCriteriaMets";

import {
  createBadgeCriteriaMet,
  deleteBadgeCriteriaMet,
  updateBadgeCriteriaMet,
} from "../api/badgeCriteriaMets/mutations";
import {
  getBadgeCriteriaMetById,
  getBadgeCriteriaMets,
} from "../api/badgeCriteriaMets/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const badgeCriteriaMetsRouter = createTRPCRouter({
  getBadgeCriteriaMets: publicProcedure.query(async () => {
    return getBadgeCriteriaMets();
  }),
  getBadgeCriteriaMetById: publicProcedure
    .input(badgeCriteriaMetIdSchema)
    .query(async ({ input }) => {
      return getBadgeCriteriaMetById(input.id);
    }),
  createBadgeCriteriaMet: publicProcedure
    .input(insertBadgeCriteriaMetParams)
    .mutation(async ({ input }) => {
      return createBadgeCriteriaMet(input);
    }),
  updateBadgeCriteriaMet: publicProcedure
    .input(updateBadgeCriteriaMetParams)
    .mutation(async ({ input }) => {
      return updateBadgeCriteriaMet(input.id, input);
    }),
  deleteBadgeCriteriaMet: publicProcedure
    .input(badgeCriteriaMetIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeCriteriaMet(input.id);
    }),
});
