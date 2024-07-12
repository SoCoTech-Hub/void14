import {
  insertUserDeviceParams,
  updateUserDeviceParams,
  userDeviceIdSchema,
} from "@soco/user-db/schema/userDevices";

import {
  createUserDevice,
  deleteUserDevice,
  updateUserDevice,
} from "../api/userDevices/mutations";
import { getUserDeviceById, getUserDevices } from "../api/userDevices/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userDevicesRouter = createTRPCRouter({
  getUserDevices: publicProcedure.query(async () => {
    return getUserDevices();
  }),
  getUserDeviceById: publicProcedure
    .input(userDeviceIdSchema)
    .query(async ({ input }) => {
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
