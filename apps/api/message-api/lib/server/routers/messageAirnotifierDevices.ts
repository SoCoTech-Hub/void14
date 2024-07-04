import {
  createMessageAirnotifierDevice,
  deleteMessageAirnotifierDevice,
  updateMessageAirnotifierDevice,
} from "../api/messageAirnotifierDevices/mutations";
import {
  getMessageAirnotifierDeviceById,
  getMessageAirnotifierDevices,
} from "../api/messageAirnotifierDevices/queries";
import {
  insertMessageAirnotifierDeviceParams,
  messageAirnotifierDeviceIdSchema,
  updateMessageAirnotifierDeviceParams,
} from "../db/schema/messageAirnotifierDevices";
import { publicProcedure, router } from "../server/trpc";

export const messageAirnotifierDevicesRouter = router({
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
