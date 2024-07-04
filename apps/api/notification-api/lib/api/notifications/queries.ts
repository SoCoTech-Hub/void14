import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { NotificationId } from "../db/schema/notifications";
import { db } from "../db/index";
import {
  notificationIdSchema,
  notifications,
} from "../db/schema/notifications";

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
