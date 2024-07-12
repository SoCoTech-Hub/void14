import {
  insertMessageAirnotifierDeviceParams,
  messageAirnotifierDeviceIdSchema,
  updateMessageAirnotifierDeviceParams,
} from "@soco/message-db/schema/messageAirnotifierDevices";

import {
  createMessageAirnotifierDevice,
  deleteMessageAirnotifierDevice,
  updateMessageAirnotifierDevice,
} from "../api/messageAirnotifierDevices/mutations";
import {
  getMessageAirnotifierDeviceById,
  getMessageAirnotifierDevices,
} from "../api/messageAirnotifierDevices/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageAirnotifierDevicesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getMessageAirnotifierDevices: publicProcedure.query(async () => {
    return getMessageAirnotifierDevices();
  }),
  getMessageAirnotifierDeviceById: publicProcedure
    .input(messageAirnotifierDeviceIdSchema)
    .query(async ({ input }) => {
      return getMessageAirnotifierDeviceById(input.id);
    }),
  createMessageAirnotifierDevice: publicProcedure
    .input(insertMessageAirnotifierDeviceParams)
    .mutation(async ({ input }) => {
      return createMessageAirnotifierDevice(input);
    }),
  updateMessageAirnotifierDevice: publicProcedure
    .input(updateMessageAirnotifierDeviceParams)
    .mutation(async ({ input }) => {
      return updateMessageAirnotifierDevice(input.id, input);
    }),
  deleteMessageAirnotifierDevice: publicProcedure
    .input(messageAirnotifierDeviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageAirnotifierDevice(input.id);
    }),
});
