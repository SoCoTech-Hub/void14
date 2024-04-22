import { getAssignmentUpgradeById, getAssignmentUpgrades } from "@/lib/api/assignmentUpgrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignmentUpgradeIdSchema,
  insertAssignmentUpgradeParams,
  updateAssignmentUpgradeParams,
} from "@/lib/db/schema/assignmentUpgrades";
import { createAssignmentUpgrade, deleteAssignmentUpgrade, updateAssignmentUpgrade } from "@/lib/api/assignmentUpgrades/mutations";

export const assignmentUpgradesRouter = router({
  getAssignmentUpgrades: publicProcedure.query(async () => {
    return getAssignmentUpgrades();
  }),
  getAssignmentUpgradeById: publicProcedure.input(assignmentUpgradeIdSchema).query(async ({ input }) => {
    return getAssignmentUpgradeById(input.id);
  }),
  createAssignmentUpgrade: publicProcedure
    .input(insertAssignmentUpgradeParams)
    .mutation(async ({ input }) => {
      return createAssignmentUpgrade(input);
    }),
  updateAssignmentUpgrade: publicProcedure
    .input(updateAssignmentUpgradeParams)
    .mutation(async ({ input }) => {
      return updateAssignmentUpgrade(input.id, input);
    }),
  deleteAssignmentUpgrade: publicProcedure
    .input(assignmentUpgradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignmentUpgrade(input.id);
    }),
});
