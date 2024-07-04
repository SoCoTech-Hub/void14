import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ExternalServicesUserId } from "../db/schema/externalServicesUsers";
import { db } from "../db/index";
import {
  externalServicesUserIdSchema,
  externalServicesUsers,
} from "../db/schema/externalServicesUsers";

export const getExternalServicesUsers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(externalServicesUsers)
    .where(eq(externalServicesUsers.userId, session?.user.id!));
  const e = rows;
  return { externalServicesUsers: e };
};

export const getExternalServicesUserById = async (
  id: ExternalServicesUserId,
) => {
  const { session } = await getUserAuth();
  const { id: externalServicesUserId } = externalServicesUserIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(externalServicesUsers)
    .where(
      and(
        eq(externalServicesUsers.id, externalServicesUserId),
        eq(externalServicesUsers.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const e = row;
  return { externalServicesUser: e };
};
