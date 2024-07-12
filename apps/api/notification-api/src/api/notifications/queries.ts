import type { NotificationId } from "@soco/notification-db/schema/notifications";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/notification-db";
import { db } from "@soco/notification-db/client";
import {
  notificationIdSchema,
  notifications,
} from "@soco/notification-db/schema/notifications";

export const getNotifications = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, session?.user.id!));
  const n = rows;
  return { notifications: n };
};

export const getNotificationById = async (id: NotificationId) => {
  const { session } = await getUserAuth();
  const { id: notificationId } = notificationIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(notifications)
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const n = row;
  return { notification: n };
};
