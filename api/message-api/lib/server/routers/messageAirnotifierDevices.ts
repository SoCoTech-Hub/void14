import { getMessageAirnotifierDeviceById, getMessageAirnotifierDevices } from "@/lib/api/messageAirnotifierDevices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageAirnotifierDeviceIdSchema,
  insertMessageAirnotifierDeviceParams,
  updateMessageAirnotifierDeviceParams,
} from "@/lib/db/schema/messageAirnotifierDevices";
import { createMessageAirnotifierDevice, deleteMessageAirnotifierDevice, updateMessageAirnotifierDevice } from "@/lib/api/messageAirnotifierDevices/mutations";

export const messageAirnotifierDevicesRouter = router({
  getMessageAirnotifierDevices: publicProcedure.query(async () => {
    return getMessageAirnotifierDevices();
  }),
  getMessageAirnotifierDeviceById: publicProcedure.input(messageAirnotifierDeviceIdSchema).query(async ({ input }) => {
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
