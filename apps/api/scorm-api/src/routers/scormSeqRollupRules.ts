import { getScormSeqRollupRuleById, getScormSeqRollupRules } from "../api/scormSeqRollupRules/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  scormSeqRollupRuleIdSchema,
  insertScormSeqRollupRuleParams,
  updateScormSeqRollupRuleParams,
} from "@soco/scorm-db/schema/scormSeqRollupRules";
import { createScormSeqRollupRule, deleteScormSeqRollupRule, updateScormSeqRollupRule } from "../api/scormSeqRollupRules/mutations";

export const scormSeqRollupRulesRouter =createTRPCRouter({
  getScormSeqRollupRules: publicProcedure.query(async () => {
    return getScormSeqRollupRules();
  }),
  getScormSeqRollupRuleById: publicProcedure.input(scormSeqRollupRuleIdSchema).query(async ({ input }) => {
    return getScormSeqRollupRuleById(input.id);
  }),
  createScormSeqRollupRule: publicProcedure
    .input(insertScormSeqRollupRuleParams)
    .mutation(async ({ input }) => {
      return createScormSeqRollupRule(input);
    }),
  updateScormSeqRollupRule: publicProcedure
    .input(updateScormSeqRollupRuleParams)
    .mutation(async ({ input }) => {
      return updateScormSeqRollupRule(input.id, input);
    }),
  deleteScormSeqRollupRule: publicProcedure
    .input(scormSeqRollupRuleIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormSeqRollupRule(input.id);
    }),
});
