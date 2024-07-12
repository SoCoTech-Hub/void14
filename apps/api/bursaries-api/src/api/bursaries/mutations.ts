import type {
  BursaryId,
  NewBursaryParams,
  UpdateBursaryParams,
} from "@soco/bursaries-db/schema/bursaries";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/bursaries-db";
import { db } from "@soco/bursaries-db/client";
import {
  bursaries,
  bursaryIdSchema,
  insertBursarySchema,
  updateBursarySchema,
} from "@soco/bursaries-db/schema/bursaries";

export const createBursary = async (bursary: NewBursaryParams) => {
  const { session } = await getUserAuth();
  const newBursary = insertBursarySchema.parse({
    ...bursary,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db.insert(bursaries).values(newBursary).returning();
    return { bursary: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBursary = async (
  id: BursaryId,
  bursary: UpdateBursaryParams,
) => {
  const { session } = await getUserAuth();
  const { id: bursaryId } = bursaryIdSchema.parse({ id });
  const newBursary = updateBursarySchema.parse({
    ...bursary,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(bursaries)
      .set({ ...newBursary, updatedAt: new Date() })
      .where(
        and(
          eq(bursaries.id, bursaryId!),
          eq(bursaries.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bursary: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBursary = async (id: BursaryId) => {
  const { session } = await getUserAuth();
  const { id: bursaryId } = bursaryIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(bursaries)
      .where(
        and(
          eq(bursaries.id, bursaryId!),
          eq(bursaries.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bursary: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
