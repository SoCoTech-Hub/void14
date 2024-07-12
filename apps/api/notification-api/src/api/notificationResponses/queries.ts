import { db } from "@soco/notification-db/client";
import { eq, and } from "@soco/notification-db";
import { getUserAuth } from "@soco/auth-service";
import { type NotificationResponseId, notificationResponseIdSchema, notificationResponses } from "@soco/notification-db/schema/notificationResponses";
import { notifications } from "@soco/notification-db/schema/notifications";

export const getNotificationResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ notificationResponse: notificationResponses, notification: notifications }).from(notificationResponses).leftJoin(notifications, eq(notificationResponses.notificationId, notifications.id)).where(eq(notificationResponses.userId, session?.user.id!));
  const n = rows .map((r) => ({ ...r.notificationResponse, notification: r.notification})); 
  return { notificationResponses: n };
};

export const getNotificationResponseById = async (id: NotificationResponseId) => {
  const { session } = await getUserAuth();
  const { id: notificationResponseId } = notificationResponseIdSchema.parse({ id });
  const [row] = await db.select({ notificationResponse: notificationResponses, notification: notifications }).from(notificationResponses).where(and(eq(notificationResponses.id, notificationResponseId), eq(notificationResponses.userId, session?.user.id!))).leftJoin(notifications, eq(notificationResponses.notificationId, notifications.id));
  if (row === undefined) return {};
  const n =  { ...row.notificationResponse, notification: row.notification } ;
  return { notificationResponse: n };
};


