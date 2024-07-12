import {
  insertToolPolicyParams,
  toolPolicyIdSchema,
  updateToolPolicyParams,
} from "@soco/tool-policy-db/schema/toolPolicies";

import {
  createToolPolicy,
  deleteToolPolicy,
  updateToolPolicy,
} from "../api/toolPolicies/mutations";
import {
  getToolPolicies,
  getToolPolicyById,
} from "../api/toolPolicies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolPoliciesRouter = createTRPCRouter({
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
