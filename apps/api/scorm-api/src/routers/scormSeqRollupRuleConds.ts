import {
  insertScormSeqRollupRuleCondParams,
  scormSeqRollupRuleCondIdSchema,
  updateScormSeqRollupRuleCondParams,
} from "@soco/scorm-db/schema/scormSeqRollupRuleConds";

import {
  createScormSeqRollupRuleCond,
  deleteScormSeqRollupRuleCond,
  updateScormSeqRollupRuleCond,
} from "../api/scormSeqRollupRuleConds/mutations";
import {
  getScormSeqRollupRuleCondById,
  getScormSeqRollupRuleConds,
} from "../api/scormSeqRollupRuleConds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormSeqRollupRuleCondsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getScormSeqRollupRuleConds: publicProcedure.query(async () => {
    return getScormSeqRollupRuleConds();
  }),
  getScormSeqRollupRuleCondById: publicProcedure
    .input(scormSeqRollupRuleCondIdSchema)
    .query(async ({ input }) => {
      return getScormSeqRollupRuleCondById(input.id);
    }),
  createScormSeqRollupRuleCond: publicProcedure
    .input(insertScormSeqRollupRuleCondParams)
    .mutation(async ({ input }) => {
      return createScormSeqRollupRuleCond(input);
    }),
  updateScormSeqRollupRuleCond: publicProcedure
    .input(updateScormSeqRollupRuleCondParams)
    .mutation(async ({ input }) => {
      return updateScormSeqRollupRuleCond(input.id, input);
    }),
  deleteScormSeqRollupRuleCond: publicProcedure
    .input(scormSeqRollupRuleCondIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormSeqRollupRuleCond(input.id);
    }),
});
