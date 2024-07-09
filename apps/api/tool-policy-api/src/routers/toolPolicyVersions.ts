import { getToolPolicyVersionById, getToolPolicyVersions } from "../api/toolPolicyVersions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  toolPolicyVersionIdSchema,
  insertToolPolicyVersionParams,
  updateToolPolicyVersionParams,
} from "@soco/tool-policy-db/schema/toolPolicyVersions";
import { createToolPolicyVersion, deleteToolPolicyVersion, updateToolPolicyVersion } from "../api/toolPolicyVersions/mutations";

export const toolPolicyVersionsRouter =createTRPCRouter({
  getToolPolicyVersions: publicProcedure.query(async () => {
    return getToolPolicyVersions();
  }),
  getToolPolicyVersionById: publicProcedure.input(toolPolicyVersionIdSchema).query(async ({ input }) => {
    return getToolPolicyVersionById(input.id);
  }),
  createToolPolicyVersion: publicProcedure
    .input(insertToolPolicyVersionParams)
    .mutation(async ({ input }) => {
      return createToolPolicyVersion(input);
    }),
  updateToolPolicyVersion: publicProcedure
    .input(updateToolPolicyVersionParams)
    .mutation(async ({ input }) => {
      return updateToolPolicyVersion(input.id, input);
    }),
  deleteToolPolicyVersion: publicProcedure
    .input(toolPolicyVersionIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolPolicyVersion(input.id);
    }),
});