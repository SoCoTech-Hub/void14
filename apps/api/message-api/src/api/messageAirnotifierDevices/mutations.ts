import { db } from "@soco/message-db/client";
import { eq } from "@soco/message-db";
import { 
  type MessageAirnotifierDeviceId, 
  type NewMessageAirnotifierDeviceParams,
  type UpdateMessageAirnotifierDeviceParams, 
  updateMessageAirnotifierDeviceSchema,
  insertMessageAirnotifierDeviceSchema, 
  messageAirnotifierDevices,
  messageAirnotifierDeviceIdSchema 
} from "@soco/message-db/schema/messageAirnotifierDevices";

export const createMessageAirnotifierDevice = async (messageAirnotifierDevice: NewMessageAirnotifierDeviceParams) => {
  const newMessageAirnotifierDevice = insertMessageAirnotifierDeviceSchema.parse(messageAirnotifierDevice);
  try {
    const [m] =  await db.insert(messageAirnotifierDevices).values(newMessageAirnotifierDevice).returning();
    return { messageAirnotifierDevice: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageAirnotifierDevice = async (id: MessageAirnotifierDeviceId, messageAirnotifierDevice: UpdateMessageAirnotifierDeviceParams) => {
  const { id: messageAirnotifierDeviceId } = messageAirnotifierDeviceIdSchema.parse({ id });
  const newMessageAirnotifierDevice = updateMessageAirnotifierDeviceSchema.parse(messageAirnotifierDevice);
  try {
    const [m] =  await db
     .update(messageAirnotifierDevices)
     .set(newMessageAirnotifierDevice)
     .where(eq(messageAirnotifierDevices.id, messageAirnotifierDeviceId!))
     .returning();
    return { messageAirnotifierDevice: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageAirnotifierDevice = async (id: MessageAirnotifierDeviceId) => {
  const { id: messageAirnotifierDeviceId } = messageAirnotifierDeviceIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageAirnotifierDevices).where(eq(messageAirnotifierDevices.id, messageAirnotifierDeviceId!))
    .returning();
    return { messageAirnotifierDevice: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

