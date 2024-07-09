import type { BadgeBackpackId } from "@soco/badge-db/schema/badgeBackpacks";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/badge-db";
import {
  badgeBackpackIdSchema,
  badgeBackpacks,
} from "@soco/badge-db/schema/badgeBackpacks";

export const getBadgeBackpacks = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(badgeBackpacks)
    .where(eq(badgeBackpacks.userId, session?.user.id!));
  const b = rows;
  return { badgeBackpacks: b };
};

export const getBadgeBackpackById = async (id: BadgeBackpackId) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackId } = badgeBackpackIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(badgeBackpacks)
    .where(
      and(
        eq(badgeBackpacks.id, badgeBackpackId),
        eq(badgeBackpacks.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const b = row;
  return { badgeBackpack: b };
};
