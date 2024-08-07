import type { UserPasswordResetId } from "@soco/user-db/schema/userPasswordResets";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/user-db";
import { db } from "@soco/user-db/client";
import {
  userPasswordResetIdSchema,
  userPasswordResets,
} from "@soco/user-db/schema/userPasswordResets";

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
