import { getBackupControllerById, getBackupControllers } from "../api/backupControllers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  backupControllerIdSchema,
  insertBackupControllerParams,
  updateBackupControllerParams,
} from "@soco/backup-db/schema/backupControllers";
import { createBackupController, deleteBackupController, updateBackupController } from "../api/backupControllers/mutations";

export const backupControllersRouter =createTRPCRouter({
  getBackupControllers: publicProcedure.query(async () => {
    return getBackupControllers();
  }),
  getBackupControllerById: publicProcedure.input(backupControllerIdSchema).query(async ({ input }) => {
    return getBackupControllerById(input.id);
  }),
  createBackupController: publicProcedure
    .input(insertBackupControllerParams)
    .mutation(async ({ input }) => {
      return createBackupController(input);
    }),
  updateBackupController: publicProcedure
    .input(updateBackupControllerParams)
    .mutation(async ({ input }) => {
      return updateBackupController(input.id, input);
    }),
  deleteBackupController: publicProcedure
    .input(backupControllerIdSchema)
    .mutation(async ({ input }) => {
      return deleteBackupController(input.id);
    }),
});
