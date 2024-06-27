import { getToolPolicyById, getToolPolicies } from "@/lib/api/toolPolicies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolPolicyIdSchema,
  insertToolPolicyParams,
  updateToolPolicyParams,
} from "@/lib/db/schema/toolPolicies";
import { createToolPolicy, deleteToolPolicy, updateToolPolicy } from "@/lib/api/toolPolicies/mutations";

export const toolPoliciesRouter = router({
  getToolPolicies: publicProcedure.query(async () => {
    return getToolPolicies();
  }),
  getToolPolicyById: publicProcedure.input(toolPolicyIdSchema).query(async ({ input }) => {
    return getToolPolicyById(input.id);
  }),
  createToolPolicy: publicProcedure
    .input(insertToolPolicyParams)
    .mutation(async ({ input }) => {
      return createToolPolicy(input);
    }),
  updateToolPolicy: publicProcedure
    .input(updateToolPolicyParams)
    .mutation(async ({ input }) => {
      return updateToolPolicy(input.id, input);
    }),
  deleteToolPolicy: publicProcedure
    .input(toolPolicyIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolPolicy(input.id);
    }),
});
