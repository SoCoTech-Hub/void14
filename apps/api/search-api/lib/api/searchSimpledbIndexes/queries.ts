import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { SearchSimpledbIndexId } from "../db/schema/searchSimpledbIndexes";
import { db } from "../db/index";
import {
  searchSimpledbIndexes,
  searchSimpledbIndexIdSchema,
} from "../db/schema/searchSimpledbIndexes";

export const getSearchSimpledbIndexes = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(searchSimpledbIndexes)
    .where(eq(searchSimpledbIndexes.userId, session?.user.id!));
  const s = rows;
  return { searchSimpledbIndexes: s };
};

export const getSearchSimpledbIndexById = async (id: SearchSimpledbIndexId) => {
  const { session } = await getUserAuth();
  const { id: searchSimpledbIndexId } = searchSimpledbIndexIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(searchSimpledbIndexes)
    .where(
      and(
        eq(searchSimpledbIndexes.id, searchSimpledbIndexId),
        eq(searchSimpledbIndexes.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const s = row;
  return { searchSimpledbIndex: s };
};
