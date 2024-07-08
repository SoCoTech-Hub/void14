import { db } from "@soco/message-db/index";
import { and, eq } from "drizzle-orm";
import { 
  MessageUserActionId, 
  NewMessageUserActionParams,
  UpdateMessageUserActionParams, 
  updateMessageUserActionSchema,
  insertMessageUserActionSchema, 
  messageUserActions,
  messageUserActionIdSchema 
} from "@soco/message-db/schema/messageUserActions";
import { getUserAuth } from "@/lib/auth/utils";

export const createMessageUserAction = async (messageUserAction: NewMessageUserActionParams) => {
  const { session } = await getUserAuth();
  const newMessageUserAction = insertMessageUserActionSchema.parse({ ...messageUserAction, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(messageUserActions).values(newMessageUserAction).returning();
    return { messageUserAction: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageUserAction = async (id: MessageUserActionId, messageUserAction: UpdateMessageUserActionParams) => {
  const { session } = await getUserAuth();
  const { id: messageUserActionId } = messageUserActionIdSchema.parse({ id });
  const newMessageUserAction = updateMessageUserActionSchema.parse({ ...messageUserAction, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(messageUserActions)
     .set({...newMessageUserAction, updatedAt: new Date() })
     .where(and(eq(messageUserActions.id, messageUserActionId!), eq(messageUserActions.userId, session?.user.id!)))
     .returning();
    return { messageUserAction: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageUserAction = async (id: MessageUserActionId) => {
  const { session } = await getUserAuth();
  const { id: messageUserActionId } = messageUserActionIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageUserActions).where(and(eq(messageUserActions.id, messageUserActionId!), eq(messageUserActions.userId, session?.user.id!)))
    .returning();
    return { messageUserAction: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

