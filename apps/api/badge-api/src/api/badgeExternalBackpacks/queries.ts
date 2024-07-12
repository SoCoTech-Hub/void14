import type { BadgeExternalBackpackId } from "@soco/badge-db/schema/badgeExternalBackpacks";
import { eq } from "@soco/badge-db";
import { db } from "@soco/badge-db/client";
import {
  badgeExternalBackpackIdSchema,
  badgeExternalBackpacks,
} from "@soco/badge-db/schema/badgeExternalBackpacks";

export const getBadgeExternalBackpacks = async () => {
  const rows = await db.select().from(badgeExternalBackpacks);
  const b = rows;
  return { badgeExternalBackpacks: b };
};

export const getBadgeExternalBackpackById = async (
  id: BadgeExternalBackpackId,
) => {
  const { id: badgeExternalBackpackId } = badgeExternalBackpackIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(badgeExternalBackpacks)
    .where(eq(badgeExternalBackpacks.id, badgeExternalBackpackId));
  if (row === undefined) return {};
  const b = row;
  return { badgeExternalBackpack: b };
};
