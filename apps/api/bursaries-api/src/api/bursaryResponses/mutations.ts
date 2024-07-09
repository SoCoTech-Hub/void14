import type {
  BursaryResponseId,
  NewBursaryResponseParams,
  UpdateBursaryResponseParams,
} from "@soco/bursaries-db/schema/bursaryResponses";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/bursaries-db";
import {
  bursaryResponseIdSchema,
  bursaryResponses,
  insertBursaryResponseSchema,
  updateBursaryResponseSchema,
} from "@soco/bursaries-db/schema/bursaryResponses";

export const createBursaryResponse = async (
  bursaryResponse: NewBursaryResponseParams,
) => {
  const { session } = await getUserAuth();
  const newBursaryResponse = insertBursaryResponseSchema.parse({
    ...bursaryResponse,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(bursaryResponses)
      .values(newBursaryResponse)
      .returning();
    return { bursaryResponse: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBursaryResponse = async (
  id: BursaryResponseId,
  bursaryResponse: UpdateBursaryResponseParams,
) => {
  const { session } = await getUserAuth();
  const { id: bursaryResponseId } = bursaryResponseIdSchema.parse({ id });
  const newBursaryResponse = updateBursaryResponseSchema.parse({
    ...bursaryResponse,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(bursaryResponses)
      .set({ ...newBursaryResponse, updatedAt: new Date() })
      .where(
        and(
          eq(bursaryResponses.id, bursaryResponseId!),
          eq(bursaryResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bursaryResponse: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBursaryResponse = async (id: BursaryResponseId) => {
  const { session } = await getUserAuth();
  const { id: bursaryResponseId } = bursaryResponseIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(bursaryResponses)
      .where(
        and(
          eq(bursaryResponses.id, bursaryResponseId!),
          eq(bursaryResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bursaryResponse: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
