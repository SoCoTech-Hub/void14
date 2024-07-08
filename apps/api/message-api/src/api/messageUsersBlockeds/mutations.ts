import { db } from "@soco/message-db/index";
import { and, eq } from "drizzle-orm";
import { 
  MessageUsersBlockedId, 
  NewMessageUsersBlockedParams,
  UpdateMessageUsersBlockedParams, 
  updateMessageUsersBlockedSchema,
  insertMessageUsersBlockedSchema, 
  messageUsersBlockeds,
  messageUsersBlockedIdSchema 
} from "@soco/message-db/schema/messageUsersBlockeds";
import { getUserAuth } from "@/lib/auth/utils";

export const createMessageUsersBlocked = async (messageUsersBlocked: NewMessageUsersBlockedParams) => {
  const { session } = await getUserAuth();
  const newMessageUsersBlocked = insertMessageUsersBlockedSchema.parse({ ...messageUsersBlocked, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(messageUsersBlockeds).values(newMessageUsersBlocked).returning();
    return { messageUsersBlocked: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageUsersBlocked = async (id: MessageUsersBlockedId, messageUsersBlocked: UpdateMessageUsersBlockedParams) => {
  const { session } = await getUserAuth();
  const { id: messageUsersBlockedId } = messageUsersBlockedIdSchema.parse({ id });
  const newMessageUsersBlocked = updateMessageUsersBlockedSchema.parse({ ...messageUsersBlocked, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(messageUsersBlockeds)
     .set({...newMessageUsersBlocked, updatedAt: new Date() })
     .where(and(eq(messageUsersBlockeds.id, messageUsersBlockedId!), eq(messageUsersBlockeds.userId, session?.user.id!)))
     .returning();
    return { messageUsersBlocked: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageUsersBlocked = async (id: MessageUsersBlockedId) => {
  const { session } = await getUserAuth();
  const { id: messageUsersBlockedId } = messageUsersBlockedIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageUsersBlockeds).where(and(eq(messageUsersBlockeds.id, messageUsersBlockedId!), eq(messageUsersBlockeds.userId, session?.user.id!)))
    .returning();
    return { messageUsersBlocked: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

