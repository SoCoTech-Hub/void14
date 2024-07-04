import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { UserPasswordHistoryId } from "../db/schema/userPasswordHistories";
import { db } from "../db/index";
import {
  userPasswordHistories,
  userPasswordHistoryIdSchema,
} from "../db/schema/userPasswordHistories";

export const getUserPasswordHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userPasswordHistories)
    .where(eq(userPasswordHistories.userId, session?.user.id!));
  const u = rows;
  return { userPasswordHistories: u };
};

export const getUserPasswordHistoryById = async (id: UserPasswordHistoryId) => {
  const { session } = await getUserAuth();
  const { id: userPasswordHistoryId } = userPasswordHistoryIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(userPasswordHistories)
    .where(
      and(
        eq(userPasswordHistories.id, userPasswordHistoryId),
        eq(userPasswordHistories.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userPasswordHistory: u };
};