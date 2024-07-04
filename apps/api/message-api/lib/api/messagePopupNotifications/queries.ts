import { eq } from "drizzle-orm";

import type { MessagePopupNotificationId } from "../db/schema/messagePopupNotifications";
import { db } from "../db/index";
import {
  messagePopupNotificationIdSchema,
  messagePopupNotifications,
} from "../db/schema/messagePopupNotifications";

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
