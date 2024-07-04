import {
  createAssignmentUpgrade,
  deleteAssignmentUpgrade,
  updateAssignmentUpgrade,
} from "../api/assignmentUpgrades/mutations";
import {
  getAssignmentUpgradeById,
  getAssignmentUpgrades,
} from "../api/assignmentUpgrades/queries";
import {
  assignmentUpgradeIdSchema,
  insertAssignmentUpgradeParams,
  updateAssignmentUpgradeParams,
} from "../db/schema/assignmentUpgrades";
import { publicProcedure, router } from "../server/trpc";

export const assignmentUpgradesRouter = router({
  getAssignmentUpgrades: publicProcedure.query(async () => {
    return getAssignmentUpgrades();
  }),
  getAssignmentUpgradeById: publicProcedure
    .input(assignmentUpgradeIdSchema)
    .query(async ({ input }) => {
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
