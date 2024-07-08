import { db } from "@soco/message-db/index";
import { eq } from "drizzle-orm";
import { type MessagePopupId, messagePopupIdSchema, messagePopups } from "@soco/message-db/schema/messagePopups";
import { messages } from "@soco/message-db/schema/messages";

export const getMessagePopups = async () => {
  const rows = await db.select({ messagePopup: messagePopups, message: messages }).from(messagePopups).leftJoin(messages, eq(messagePopups.messageId, messages.id));
  const m = rows .map((r) => ({ ...r.messagePopup, message: r.message})); 
  return { messagePopups: m };
};

export const getMessagePopupById = async (id: MessagePopupId) => {
  const { id: messagePopupId } = messagePopupIdSchema.parse({ id });
  const [row] = await db.select({ messagePopup: messagePopups, message: messages }).from(messagePopups).where(eq(messagePopups.id, messagePopupId)).leftJoin(messages, eq(messagePopups.messageId, messages.id));
  if (row === undefined) return {};
  const m =  { ...row.messagePopup, message: row.message } ;
  return { messagePopup: m };
};


