import { db } from "@soco/badge-db/client";
import { eq, and } from "@soco/badge-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type BadgeBackpackId, badgeBackpackIdSchema, badgeBackpacks } from "@soco/badge-db/schema/badgeBackpacks";

export const getBadgeBackpacks = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(badgeBackpacks).where(eq(badgeBackpacks.userId, session?.user.id!));
  const b = rows
  return { badgeBackpacks: b };
};

export const getBadgeBackpackById = async (id: BadgeBackpackId) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackId } = badgeBackpackIdSchema.parse({ id });
  const [row] = await db.select().from(badgeBackpacks).where(and(eq(badgeBackpacks.id, badgeBackpackId), eq(badgeBackpacks.userId, session?.user.id!)));
  if (row === undefined) return {};
  const b = row;
  return { badgeBackpack: b };
};


