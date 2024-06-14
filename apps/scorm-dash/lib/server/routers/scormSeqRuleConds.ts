import { getScormSeqRuleCondById, getScormSeqRuleConds } from "@/lib/api/scormSeqRuleConds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scormSeqRuleCondIdSchema,
  insertScormSeqRuleCondParams,
  updateScormSeqRuleCondParams,
} from "@/lib/db/schema/scormSeqRuleConds";
import { createScormSeqRuleCond, deleteScormSeqRuleCond, updateScormSeqRuleCond } from "@/lib/api/scormSeqRuleConds/mutations";

export const scormSeqRuleCondsRouter = router({
  getScormSeqRuleConds: publicProcedure.query(async () => {
    return getScormSeqRuleConds();
  }),
  getScormSeqRuleCondById: publicProcedure.input(scormSeqRuleCondIdSchema).query(async ({ input }) => {
    return getScormSeqRuleCondById(input.id);
  }),
  createScormSeqRuleCond: publicProcedure
    .input(insertScormSeqRuleCondParams)
    .mutation(async ({ input }) => {
      return createScormSeqRuleCond(input);
    }),
  updateScormSeqRuleCond: publicProcedure
    .input(updateScormSeqRuleCondParams)
    .mutation(async ({ input }) => {
      return updateScormSeqRuleCond(input.id, input);
    }),
  deleteScormSeqRuleCond: publicProcedure
    .input(scormSeqRuleCondIdSchema)
    .mutation(async ({ input }) => {
      return deleteScormSeqRuleCond(input.id);
    }),
});
