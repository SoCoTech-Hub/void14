import type { BadgeId } from "@soco/badge-db/schema/badges";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/badge-db";
import { db } from "@soco/badge-db/client";
import { badgeIdSchema, badges } from "@soco/badge-db/schema/badges";

export const getBadges = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(badges)
    .where(eq(badges.userId, session?.user.id!));
  const b = rows;
  return { badges: b };
};

export const getBadgeById = async (id: BadgeId) => {
  const { session } = await getUserAuth();
  const { id: badgeId } = badgeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(badges)
    .where(and(eq(badges.id, badgeId), eq(badges.userId, session?.user.id!)));
  if (row === undefined) return {};
  const b = row;
  return { badge: b };
};
