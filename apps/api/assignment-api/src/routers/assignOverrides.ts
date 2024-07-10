import { getAssignOverrideById, getAssignOverrides } from "../api/assignOverrides/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  assignOverrideIdSchema,
  insertAssignOverrideParams,
  updateAssignOverrideParams,
} from "@soco/assignment-db/schema/assignOverrides";
import { createAssignOverride, deleteAssignOverride, updateAssignOverride } from "../api/assignOverrides/mutations";

export const assignOverridesRouter =createTRPCRouter({
  getAssignOverrides: publicProcedure.query(async () => {
    return getAssignOverrides();
  }),
  getAssignOverrideById: publicProcedure.input(assignOverrideIdSchema).query(async ({ input }) => {
    return getAssignOverrideById(input.id);
  }),
  createAssignOverride: publicProcedure
    .input(insertAssignOverrideParams)
    .mutation(async ({ input }) => {
      return createAssignOverride(input);
    }),
  updateAssignOverride: publicProcedure
    .input(updateAssignOverrideParams)
    .mutation(async ({ input }) => {
      return updateAssignOverride(input.id, input);
    }),
  deleteAssignOverride: publicProcedure
    .input(assignOverrideIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignOverride(input.id);
    }),
});
