import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MessageAirnotifierDeviceId, messageAirnotifierDeviceIdSchema, messageAirnotifierDevices } from "@/lib/db/schema/messageAirnotifierDevices";

export const getMessageAirnotifierDevices = async () => {
  const rows = await db.select().from(messageAirnotifierDevices);
  const m = rows
  return { messageAirnotifierDevices: m };
};

export const getMessageAirnotifierDeviceById = async (id: MessageAirnotifierDeviceId) => {
  const { id: messageAirnotifierDeviceId } = messageAirnotifierDeviceIdSchema.parse({ id });
  const [row] = await db.select().from(messageAirnotifierDevices).where(eq(messageAirnotifierDevices.id, messageAirnotifierDeviceId));
  if (row === undefined) return {};
  const m = row;
  return { messageAirnotifierDevice: m };
};


