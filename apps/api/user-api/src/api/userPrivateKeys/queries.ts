import type { UserPrivateKeyId } from "@soco/user-db/schema/userPrivateKeys";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/user-db";
import { db } from "@soco/user-db/client";
import {
  userPrivateKeyIdSchema,
  userPrivateKeys,
} from "@soco/user-db/schema/userPrivateKeys";

export const getUserPrivateKeys = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userPrivateKeys)
    .where(eq(userPrivateKeys.userId, session?.user.id!));
  const u = rows;
  return { userPrivateKeys: u };
};

export const getUserPrivateKeyById = async (id: UserPrivateKeyId) => {
  const { session } = await getUserAuth();
  const { id: userPrivateKeyId } = userPrivateKeyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userPrivateKeys)
    .where(
      and(
        eq(userPrivateKeys.id, userPrivateKeyId),
        eq(userPrivateKeys.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userPrivateKey: u };
};
