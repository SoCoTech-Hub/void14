import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertMassMailListSchema,
  MassMailListId,
  massMailListIdSchema,
  massMailLists,
  NewMassMailListParams,
  UpdateMassMailListParams,
  updateMassMailListSchema,
} from "../../db/schema/massMailLists";

export const createMassMailList = async (
  massMailList: NewMassMailListParams,
) => {
  const { session } = await getUserAuth();
  const newMassMailList = insertMassMailListSchema.parse({
    ...massMailList,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .insert(massMailLists)
      .values(newMassMailList)
      .returning();
    return { massMailList: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMassMailList = async (
  id: MassMailListId,
  massMailList: UpdateMassMailListParams,
) => {
  const { session } = await getUserAuth();
  const { id: massMailListId } = massMailListIdSchema.parse({ id });
  const newMassMailList = updateMassMailListSchema.parse({
    ...massMailList,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .update(massMailLists)
      .set({ ...newMassMailList, updatedAt: new Date() })
      .where(
        and(
          eq(massMailLists.id, massMailListId!),
          eq(massMailLists.userId, session?.user.id!),
        ),
      )
      .returning();
    return { massMailList: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMassMailList = async (id: MassMailListId) => {
  const { session } = await getUserAuth();
  const { id: massMailListId } = massMailListIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(massMailLists)
      .where(
        and(
          eq(massMailLists.id, massMailListId!),
          eq(massMailLists.userId, session?.user.id!),
        ),
      )
      .returning();
    return { massMailList: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
