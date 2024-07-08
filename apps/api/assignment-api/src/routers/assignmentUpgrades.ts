import { getAssignmentUpgradeById, getAssignmentUpgrades } from "../api/assignmentUpgrades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  assignmentUpgradeIdSchema,
  insertAssignmentUpgradeParams,
  updateAssignmentUpgradeParams,
} from "@soco/assignment-db/schema/assignmentUpgrades";
import { createAssignmentUpgrade, deleteAssignmentUpgrade, updateAssignmentUpgrade } from "../api/assignmentUpgrades/mutations";

export const assignmentUpgradesRouter =createTRPCRouter({
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
