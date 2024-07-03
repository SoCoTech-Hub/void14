import { getBackupControllerById, getBackupControllers } from "@/lib/api/backupControllers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  backupControllerIdSchema,
  insertBackupControllerParams,
  updateBackupControllerParams,
} from "@/lib/db/schema/backupControllers";
import { createBackupController, deleteBackupController, updateBackupController } from "@/lib/api/backupControllers/mutations";

export const backupControllersRouter = router({
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
