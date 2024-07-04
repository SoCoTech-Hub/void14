import {
  createScormSeqRuleCondition,
  deleteScormSeqRuleCondition,
  updateScormSeqRuleCondition,
} from "../api/scormSeqRuleConditions/mutations";
import {
  getScormSeqRuleConditionById,
  getScormSeqRuleConditions,
} from "../api/scormSeqRuleConditions/queries";
import {
  insertScormSeqRuleConditionParams,
  scormSeqRuleConditionIdSchema,
  updateScormSeqRuleConditionParams,
} from "../db/schema/scormSeqRuleConditions";
import { publicProcedure, router } from "../server/trpc";

export const scormSeqRuleConditionsRouter = router({
  getScormSeqRuleConditions: publicProcedure.query(async () => {
    return getScormSeqRuleConditions();
  }),
  getScormSeqRuleConditionById: publicProcedure
    .input(scormSeqRuleConditionIdSchema)
    .query(async ({ input }) => {
      return getScormSeqRuleConditionById(input.id);
    }),
  createScormSeqRuleCondition: publicProcedure
    .input(insertScormSeqRuleConditionParams)
    .mutation(async ({ input }) => {
      return createScormSeqRuleCondition(input);
    }),
  updateScormSeqRuleCondition: publicProcedure
    .input(updateScormSeqRuleConditionParams)
    .mutation(async ({ input }) => {
      return updateScormSeqRuleCondition(input.id, input);
    }),
  deleteScormSeqRuleCondition: publicProcedure
    .input(scormSeqRuleConditionIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormSeqRuleCondition(input.id);
    }),
});
