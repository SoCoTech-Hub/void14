import {
  createBadgeCriteriaParam,
  deleteBadgeCriteriaParam,
  updateBadgeCriteriaParam,
} from "../api/badgeCriteriaParams/mutations";
import {
  getBadgeCriteriaParamById,
  getBadgeCriteriaParams,
} from "../api/badgeCriteriaParams/queries";
import {
  badgeCriteriaParamIdSchema,
  insertBadgeCriteriaParamParams,
  updateBadgeCriteriaParamParams,
} from "../db/schema/badgeCriteriaParams";
import { publicProcedure, router } from "../server/trpc";

export const badgeCriteriaParamsRouter = router({
  getBadgeCriteriaParams: publicProcedure.query(async () => {
    return getBadgeCriteriaParams();
  }),
  getBadgeCriteriaParamById: publicProcedure
    .input(badgeCriteriaParamIdSchema)
    .query(async ({ input }) => {
      return getBadgeCriteriaParamById(input.id);
    }),
  createBadgeCriteriaParam: publicProcedure
    .input(insertBadgeCriteriaParamParams)
    .mutation(async ({ input }) => {
      return createBadgeCriteriaParam(input);
    }),
  updateBadgeCriteriaParam: publicProcedure
    .input(updateBadgeCriteriaParamParams)
    .mutation(async ({ input }) => {
      return updateBadgeCriteriaParam(input.id, input);
    }),
  deleteBadgeCriteriaParam: publicProcedure
    .input(badgeCriteriaParamIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeCriteriaParam(input.id);
    }),
});
