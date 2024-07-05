import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { UserPasswordResetId } from "../../db/schema/userPasswordResets";
import { db } from "../../db/index";
import {
  userPasswordResetIdSchema,
  userPasswordResets,
} from "../../db/schema/userPasswordResets";

export const getUserPasswordResets = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userPasswordResets)
    .where(eq(userPasswordResets.userId, session?.user.id!));
  const u = rows;
  return { userPasswordResets: u };
};

export const getUserPasswordResetById = async (id: UserPasswordResetId) => {
  const { session } = await getUserAuth();
  const { id: userPasswordResetId } = userPasswordResetIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userPasswordResets)
    .where(
      and(
        eq(userPasswordResets.id, userPasswordResetId),
        eq(userPasswordResets.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userPasswordReset: u };
};
