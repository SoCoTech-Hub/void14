import type {
  NewSearchSimpledbIndexParams,
  SearchSimpledbIndexId,
  UpdateSearchSimpledbIndexParams,
} from "@soco/search-db/schema/searchSimpledbIndexes";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/search-db";
import { db } from "@soco/search-db/client";
import {
  insertSearchSimpledbIndexSchema,
  searchSimpledbIndexes,
  searchSimpledbIndexIdSchema,
  updateSearchSimpledbIndexSchema,
} from "@soco/search-db/schema/searchSimpledbIndexes";

export const createSearchSimpledbIndex = async (
  searchSimpledbIndex: NewSearchSimpledbIndexParams,
) => {
  const { session } = await getUserAuth();
  const newSearchSimpledbIndex = insertSearchSimpledbIndexSchema.parse({
    ...searchSimpledbIndex,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(searchSimpledbIndexes)
      .values(newSearchSimpledbIndex)
      .returning();
    return { searchSimpledbIndex: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSearchSimpledbIndex = async (
  id: SearchSimpledbIndexId,
  searchSimpledbIndex: UpdateSearchSimpledbIndexParams,
) => {
  const { session } = await getUserAuth();
  const { id: searchSimpledbIndexId } = searchSimpledbIndexIdSchema.parse({
    id,
  });
  const newSearchSimpledbIndex = updateSearchSimpledbIndexSchema.parse({
    ...searchSimpledbIndex,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(searchSimpledbIndexes)
      .set({ ...newSearchSimpledbIndex, updatedAt: new Date() })
      .where(
        and(
          eq(searchSimpledbIndexes.id, searchSimpledbIndexId!),
          eq(searchSimpledbIndexes.userId, session?.user.id!),
        ),
      )
      .returning();
    return { searchSimpledbIndex: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSearchSimpledbIndex = async (id: SearchSimpledbIndexId) => {
  const { session } = await getUserAuth();
  const { id: searchSimpledbIndexId } = searchSimpledbIndexIdSchema.parse({
    id,
  });
  try {
    const [s] = await db
      .delete(searchSimpledbIndexes)
      .where(
        and(
          eq(searchSimpledbIndexes.id, searchSimpledbIndexId!),
          eq(searchSimpledbIndexes.userId, session?.user.id!),
        ),
      )
      .returning();
    return { searchSimpledbIndex: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
