import { db } from "@soco/message-db/index";
import { eq } from "drizzle-orm";
import { 
  MessagePopupNotificationId, 
  NewMessagePopupNotificationParams,
  UpdateMessagePopupNotificationParams, 
  updateMessagePopupNotificationSchema,
  insertMessagePopupNotificationSchema, 
  messagePopupNotifications,
  messagePopupNotificationIdSchema 
} from "@soco/message-db/schema/messagePopupNotifications";

export const createMessagePopupNotification = async (messagePopupNotification: NewMessagePopupNotificationParams) => {
  const newMessagePopupNotification = insertMessagePopupNotificationSchema.parse(messagePopupNotification);
  try {
    const [m] =  await db.insert(messagePopupNotifications).values(newMessagePopupNotification).returning();
    return { messagePopupNotification: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessagePopupNotification = async (id: MessagePopupNotificationId, messagePopupNotification: UpdateMessagePopupNotificationParams) => {
  const { id: messagePopupNotificationId } = messagePopupNotificationIdSchema.parse({ id });
  const newMessagePopupNotification = updateMessagePopupNotificationSchema.parse(messagePopupNotification);
  try {
    const [m] =  await db
     .update(messagePopupNotifications)
     .set(newMessagePopupNotification)
     .where(eq(messagePopupNotifications.id, messagePopupNotificationId!))
     .returning();
    return { messagePopupNotification: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessagePopupNotification = async (id: MessagePopupNotificationId) => {
  const { id: messagePopupNotificationId } = messagePopupNotificationIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messagePopupNotifications).where(eq(messagePopupNotifications.id, messagePopupNotificationId!))
    .returning();
    return { messagePopupNotification: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

