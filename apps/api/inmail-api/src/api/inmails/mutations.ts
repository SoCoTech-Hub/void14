import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/inmail-db";
import { db } from "@soco/inmail-db/client";
import {
  InmailId,
  inmailIdSchema,
  inmails,
  insertInmailSchema,
  NewInmailParams,
  UpdateInmailParams,
  updateInmailSchema,
} from "@soco/inmail-db/schema/inmails";

export const createInmail = async (inmail: NewInmailParams) => {
  const { session } = await getUserAuth();
  const newInmail = insertInmailSchema.parse({
    ...inmail,
    userId: session?.user.id!,
  });
  try {
    const [i] = await db.insert(inmails).values(newInmail).returning();
    return { inmail: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInmail = async (
  id: InmailId,
  inmail: UpdateInmailParams,
) => {
  const { session } = await getUserAuth();
  const { id: inmailId } = inmailIdSchema.parse({ id });
  const newInmail = updateInmailSchema.parse({
    ...inmail,
    userId: session?.user.id!,
  });
  try {
    const [i] = await db
      .update(inmails)
      .set({ ...newInmail, updatedAt: new Date() })
      .where(
        and(eq(inmails.id, inmailId!), eq(inmails.userId, session?.user.id!)),
      )
      .returning();
    return { inmail: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInmail = async (id: InmailId) => {
  const { session } = await getUserAuth();
  const { id: inmailId } = inmailIdSchema.parse({ id });
  try {
    const [i] = await db
      .delete(inmails)
      .where(
        and(eq(inmails.id, inmailId!), eq(inmails.userId, session?.user.id!)),
      )
      .returning();
    return { inmail: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
