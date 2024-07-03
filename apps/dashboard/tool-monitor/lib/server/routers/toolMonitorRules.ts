import { getToolMonitorRuleById, getToolMonitorRules } from "@/lib/api/toolMonitorRules/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolMonitorRuleIdSchema,
  insertToolMonitorRuleParams,
  updateToolMonitorRuleParams,
} from "@/lib/db/schema/toolMonitorRules";
import { createToolMonitorRule, deleteToolMonitorRule, updateToolMonitorRule } from "@/lib/api/toolMonitorRules/mutations";

export const toolMonitorRulesRouter = router({
  getToolMonitorRules: publicProcedure.query(async () => {
    return getToolMonitorRules();
  }),
  getToolMonitorRuleById: publicProcedure.input(toolMonitorRuleIdSchema).query(async ({ input }) => {
    return getToolMonitorRuleById(input.id);
  }),
  createToolMonitorRule: publicProcedure
    .input(insertToolMonitorRuleParams)
    .mutation(async ({ input }) => {
      return createToolMonitorRule(input);
    }),
  updateToolMonitorRule: publicProcedure
    .input(updateToolMonitorRuleParams)
    .mutation(async ({ input }) => {
      return updateToolMonitorRule(input.id, input);
    }),
  deleteToolMonitorRule: publicProcedure
    .input(toolMonitorRuleIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolMonitorRule(input.id);
    }),
});
