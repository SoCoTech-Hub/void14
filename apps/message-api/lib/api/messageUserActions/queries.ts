import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type MessageUserActionId, messageUserActionIdSchema, messageUserActions } from "@/lib/db/schema/messageUserActions";

export const getMessageUserActions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageUserActions).where(eq(messageUserActions.userId, session?.user.id!));
  const m = rows
  return { messageUserActions: m };
};

export const getMessageUserActionById = async (id: MessageUserActionId) => {
  const { session } = await getUserAuth();
  const { id: messageUserActionId } = messageUserActionIdSchema.parse({ id });
  const [row] = await db.select().from(messageUserActions).where(and(eq(messageUserActions.id, messageUserActionId), eq(messageUserActions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageUserAction: m };
};


