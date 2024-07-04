import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { UserLastAccessId } from "../db/schema/userLastAccesses";
import { db } from "../db/index";
import {
  userLastAccesses,
  userLastAccessIdSchema,
} from "../db/schema/userLastAccesses";

export const getUserLastAccesses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userLastAccesses)
    .where(eq(userLastAccesses.userId, session?.user.id!));
  const u = rows;
  return { userLastAccesses: u };
};

export const getUserLastAccessById = async (id: UserLastAccessId) => {
  const { session } = await getUserAuth();
  const { id: userLastAccessId } = userLastAccessIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userLastAccesses)
    .where(
      and(
        eq(userLastAccesses.id, userLastAccessId),
        eq(userLastAccesses.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userLastAccess: u };
};
