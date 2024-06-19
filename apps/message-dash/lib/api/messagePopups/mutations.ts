import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  MessagePopupId, 
  NewMessagePopupParams,
  UpdateMessagePopupParams, 
  updateMessagePopupSchema,
  insertMessagePopupSchema, 
  messagePopups,
  messagePopupIdSchema 
} from "@/lib/db/schema/messagePopups";

export const createMessagePopup = async (messagePopup: NewMessagePopupParams) => {
  const newMessagePopup = insertMessagePopupSchema.parse(messagePopup);
  try {
    const [m] =  await db.insert(messagePopups).values(newMessagePopup).returning();
    return { messagePopup: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessagePopup = async (id: MessagePopupId, messagePopup: UpdateMessagePopupParams) => {
  const { id: messagePopupId } = messagePopupIdSchema.parse({ id });
  const newMessagePopup = updateMessagePopupSchema.parse(messagePopup);
  try {
    const [m] =  await db
     .update(messagePopups)
     .set(newMessagePopup)
     .where(eq(messagePopups.id, messagePopupId!))
     .returning();
    return { messagePopup: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessagePopup = async (id: MessagePopupId) => {
  const { id: messagePopupId } = messagePopupIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messagePopups).where(eq(messagePopups.id, messagePopupId!))
    .returning();
    return { messagePopup: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

