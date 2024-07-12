import type { BadgeExternalIdentifierId } from "@soco/badge-db/schema/badgeExternalIdentifiers";
import { eq } from "@soco/badge-db";
import { db } from "@soco/badge-db/client";
import { badgeBackpacks } from "@soco/badge-db/schema/badgeBackpacks";
import {
  badgeExternalIdentifierIdSchema,
  badgeExternalIdentifiers,
} from "@soco/badge-db/schema/badgeExternalIdentifiers";

export const getBadgeExternalIdentifiers = async () => {
  const rows = await db
    .select({
      badgeExternalIdentifier: badgeExternalIdentifiers,
      badgeBackpack: badgeBackpacks,
    })
    .from(badgeExternalIdentifiers)
    .leftJoin(
      badgeBackpacks,
      eq(badgeExternalIdentifiers.badgeBackpackId, badgeBackpacks.id),
    );
  const b = rows.map((r) => ({
    ...r.badgeExternalIdentifier,
    badgeBackpack: r.badgeBackpack,
  }));
  return { badgeExternalIdentifiers: b };
};

export const getBadgeExternalIdentifierById = async (
  id: BadgeExternalIdentifierId,
) => {
  const { id: badgeExternalIdentifierId } =
    badgeExternalIdentifierIdSchema.parse({ id });
  const [row] = await db
    .select({
      badgeExternalIdentifier: badgeExternalIdentifiers,
      badgeBackpack: badgeBackpacks,
    })
    .from(badgeExternalIdentifiers)
    .where(eq(badgeExternalIdentifiers.id, badgeExternalIdentifierId))
    .leftJoin(
      badgeBackpacks,
      eq(badgeExternalIdentifiers.badgeBackpackId, badgeBackpacks.id),
    );
  if (row === undefined) return {};
  const b = {
    ...row.badgeExternalIdentifier,
    badgeBackpack: row.badgeBackpack,
  };
  return { badgeExternalIdentifier: b };
};
