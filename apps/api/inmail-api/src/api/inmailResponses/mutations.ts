import type {
  InmailResponseId,
  NewInmailResponseParams,
  UpdateInmailResponseParams,
} from "@soco/inmail-db/schema/inmailResponses";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/inmail-db";
import { db } from "@soco/inmail-db/client";
import {
  inmailResponseIdSchema,
  inmailResponses,
  insertInmailResponseSchema,
  updateInmailResponseSchema,
} from "@soco/inmail-db/schema/inmailResponses";

export const createInmailResponse = async (
  inmailResponse: NewInmailResponseParams,
) => {
  const { session } = await getUserAuth();
  const newInmailResponse = insertInmailResponseSchema.parse({
    ...inmailResponse,
    userId: session?.user.id!,
  });
  try {
    const [i] = await db
      .insert(inmailResponses)
      .values(newInmailResponse)
      .returning();
    return { inmailResponse: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInmailResponse = async (
  id: InmailResponseId,
  inmailResponse: UpdateInmailResponseParams,
) => {
  const { session } = await getUserAuth();
  const { id: inmailResponseId } = inmailResponseIdSchema.parse({ id });
  const newInmailResponse = updateInmailResponseSchema.parse({
    ...inmailResponse,
    userId: session?.user.id!,
  });
  try {
    const [i] = await db
      .update(inmailResponses)
      .set(newInmailResponse)
      .where(
        and(
          eq(inmailResponses.id, inmailResponseId!),
          eq(inmailResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { inmailResponse: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInmailResponse = async (id: InmailResponseId) => {
  const { session } = await getUserAuth();
  const { id: inmailResponseId } = inmailResponseIdSchema.parse({ id });
  try {
    const [i] = await db
      .delete(inmailResponses)
      .where(
        and(
          eq(inmailResponses.id, inmailResponseId!),
          eq(inmailResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { inmailResponse: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
