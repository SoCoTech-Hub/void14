import { getUserDeviceById, getUserDevices } from "@/lib/api/userDevices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userDeviceIdSchema,
  insertUserDeviceParams,
  updateUserDeviceParams,
} from "@/lib/db/schema/userDevices";
import { createUserDevice, deleteUserDevice, updateUserDevice } from "@/lib/api/userDevices/mutations";

export const userDevicesRouter = router({
  getUserDevices: publicProcedure.query(async () => {
    return getUserDevices();
  }),
  getUserDeviceById: publicProcedure.input(userDeviceIdSchema).query(async ({ input }) => {
    return getUserDeviceById(input.id);
  }),
  createUserDevice: publicProcedure
    .input(insertUserDeviceParams)
    .mutation(async ({ input }) => {
      return createUserDevice(input);
    }),
  updateUserDevice: publicProcedure
    .input(updateUserDeviceParams)
    .mutation(async ({ input }) => {
      return updateUserDevice(input.id, input);
    }),
  deleteUserDevice: publicProcedure
    .input(userDeviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserDevice(input.id);
    }),
});
