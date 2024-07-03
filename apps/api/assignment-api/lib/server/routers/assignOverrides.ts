import { getAssignOverrideById, getAssignOverrides } from "@/lib/api/assignOverrides/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignOverrideIdSchema,
  insertAssignOverrideParams,
  updateAssignOverrideParams,
} from "@/lib/db/schema/assignOverrides";
import { createAssignOverride, deleteAssignOverride, updateAssignOverride } from "@/lib/api/assignOverrides/mutations";

export const assignOverridesRouter = router({
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
