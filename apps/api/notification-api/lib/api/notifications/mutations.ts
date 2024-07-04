import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  NotificationId, 
  NewNotificationParams,
  UpdateNotificationParams, 
  updateNotificationSchema,
  insertNotificationSchema, 
  notifications,
  notificationIdSchema 
} from "@/lib/db/schema/notifications";
import { getUserAuth } from "@soco/auth/utils";

export const createNotification = async (notification: NewNotificationParams) => {
  const { session } = await getUserAuth();
  const newNotification = insertNotificationSchema.parse({ ...notification, userId: session?.user.id! });
  try {
    const [n] =  await db.insert(notifications).values(newNotification).returning();
    return { notification: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNotification = async (id: NotificationId, notification: UpdateNotificationParams) => {
  const { session } = await getUserAuth();
  const { id: notificationId } = notificationIdSchema.parse({ id });
  const newNotification = updateNotificationSchema.parse({ ...notification, userId: session?.user.id! });
  try {
    const [n] =  await db
     .update(notifications)
     .set({...newNotification, updatedAt: new Date() })
     .where(and(eq(notifications.id, notificationId!), eq(notifications.userId, session?.user.id!)))
     .returning();
    return { notification: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNotification = async (id: NotificationId) => {
  const { session } = await getUserAuth();
  const { id: notificationId } = notificationIdSchema.parse({ id });
  try {
    const [n] =  await db.delete(notifications).where(and(eq(notifications.id, notificationId!), eq(notifications.userId, session?.user.id!)))
    .returning();
    return { notification: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

