import {
  createToolPolicy,
  deleteToolPolicy,
  updateToolPolicy,
} from "../api/toolPolicies/mutations";
import {
  getToolPolicies,
  getToolPolicyById,
} from "../api/toolPolicies/queries";
import {
  insertToolPolicyParams,
  toolPolicyIdSchema,
  updateToolPolicyParams,
} from "../db/schema/toolPolicies";
import { publicProcedure, router } from "../server/trpc";

export const toolPoliciesRouter = router({
  getToolPolicies: publicProcedure.query(async () => {
    return getToolPolicies();
  }),
  getToolPolicyById: publicProcedure
    .input(toolPolicyIdSchema)
    .query(async ({ input }) => {
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
