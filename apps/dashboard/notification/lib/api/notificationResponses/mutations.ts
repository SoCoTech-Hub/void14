import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type NotificationResponseId, 
  type NewNotificationResponseParams,
  type UpdateNotificationResponseParams, 
  updateNotificationResponseSchema,
  insertNotificationResponseSchema, 
  notificationResponses,
  notificationResponseIdSchema 
} from "@/lib/db/schema/notificationResponses";
import { getUserAuth } from "@/lib/auth/utils";

export const createNotificationResponse = async (notificationResponse: NewNotificationResponseParams) => {
  const { session } = await getUserAuth();
  const newNotificationResponse = insertNotificationResponseSchema.parse({ ...notificationResponse, userId: session?.user.id! });
  try {
    const [n] =  await db.insert(notificationResponses).values(newNotificationResponse).returning();
    return { notificationResponse: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNotificationResponse = async (id: NotificationResponseId, notificationResponse: UpdateNotificationResponseParams) => {
  const { session } = await getUserAuth();
  const { id: notificationResponseId } = notificationResponseIdSchema.parse({ id });
  const newNotificationResponse = updateNotificationResponseSchema.parse({ ...notificationResponse, userId: session?.user.id! });
  try {
    const [n] =  await db
     .update(notificationResponses)
     .set(newNotificationResponse)
     .where(and(eq(notificationResponses.id, notificationResponseId!), eq(notificationResponses.userId, session?.user.id!)))
     .returning();
    return { notificationResponse: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNotificationResponse = async (id: NotificationResponseId) => {
  const { session } = await getUserAuth();
  const { id: notificationResponseId } = notificationResponseIdSchema.parse({ id });
  try {
    const [n] =  await db.delete(notificationResponses).where(and(eq(notificationResponses.id, notificationResponseId!), eq(notificationResponses.userId, session?.user.id!)))
    .returning();
    return { notificationResponse: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

