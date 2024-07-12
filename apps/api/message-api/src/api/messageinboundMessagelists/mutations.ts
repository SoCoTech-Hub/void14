import type {
  MessageinboundMessagelistId,
  NewMessageinboundMessagelistParams,
  UpdateMessageinboundMessagelistParams,
} from "@soco/message-db/schema/messageinboundMessagelists";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  insertMessageinboundMessagelistSchema,
  messageinboundMessagelistIdSchema,
  messageinboundMessagelists,
  updateMessageinboundMessagelistSchema,
} from "@soco/message-db/schema/messageinboundMessagelists";

export const createMessageinboundMessagelist = async (
  messageinboundMessagelist: NewMessageinboundMessagelistParams,
) => {
  const { session } = await getUserAuth();
  const newMessageinboundMessagelist =
    insertMessageinboundMessagelistSchema.parse({
      ...messageinboundMessagelist,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .insert(messageinboundMessagelists)
      .values(newMessageinboundMessagelist)
      .returning();
    return { messageinboundMessagelist: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageinboundMessagelist = async (
  id: MessageinboundMessagelistId,
  messageinboundMessagelist: UpdateMessageinboundMessagelistParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageinboundMessagelistId } =
    messageinboundMessagelistIdSchema.parse({ id });
  const newMessageinboundMessagelist =
    updateMessageinboundMessagelistSchema.parse({
      ...messageinboundMessagelist,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .update(messageinboundMessagelists)
      .set({ ...newMessageinboundMessagelist, updatedAt: new Date() })
      .where(
        and(
          eq(messageinboundMessagelists.id, messageinboundMessagelistId!),
          eq(messageinboundMessagelists.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageinboundMessagelist: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageinboundMessagelist = async (
  id: MessageinboundMessagelistId,
) => {
  const { session } = await getUserAuth();
  const { id: messageinboundMessagelistId } =
    messageinboundMessagelistIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messageinboundMessagelists)
      .where(
        and(
          eq(messageinboundMessagelists.id, messageinboundMessagelistId!),
          eq(messageinboundMessagelists.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageinboundMessagelist: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
