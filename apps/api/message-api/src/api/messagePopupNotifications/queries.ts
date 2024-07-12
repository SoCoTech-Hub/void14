import type { MessagePopupNotificationId } from "@soco/message-db/schema/messagePopupNotifications";
import { eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messagePopupNotificationIdSchema,
  messagePopupNotifications,
} from "@soco/message-db/schema/messagePopupNotifications";

export const getMessagePopupNotifications = async () => {
  const rows = await db.select().from(messagePopupNotifications);
  const m = rows;
  return { messagePopupNotifications: m };
};

export const getMessagePopupNotificationById = async (
  id: MessagePopupNotificationId,
) => {
  const { id: messagePopupNotificationId } =
    messagePopupNotificationIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messagePopupNotifications)
    .where(eq(messagePopupNotifications.id, messagePopupNotificationId));
  if (row === undefined) return {};
  const m = row;
  return { messagePopupNotification: m };
};
