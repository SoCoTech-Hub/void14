import { eq } from "drizzle-orm";

import type { BadgeExternalId } from "../db/schema/badgeExternals";
import { db } from "../db/index";
import { badgeBackpacks } from "../db/schema/badgeBackpacks";
import {
  badgeExternalIdSchema,
  badgeExternals,
} from "../db/schema/badgeExternals";

export const getBadgeExternals = async () => {
  const rows = await db
    .select({ badgeExternal: badgeExternals, badgeBackpack: badgeBackpacks })
    .from(badgeExternals)
    .leftJoin(
      badgeBackpacks,
      eq(badgeExternals.badgeBackpackId, badgeBackpacks.id),
    );
  const b = rows.map((r) => ({
    ...r.badgeExternal,
    badgeBackpack: r.badgeBackpack,
  }));
  return { badgeExternals: b };
};

export const getBadgeExternalById = async (id: BadgeExternalId) => {
  const { id: badgeExternalId } = badgeExternalIdSchema.parse({ id });
  const [row] = await db
    .select({ badgeExternal: badgeExternals, badgeBackpack: badgeBackpacks })
    .from(badgeExternals)
    .where(eq(badgeExternals.id, badgeExternalId))
    .leftJoin(
      badgeBackpacks,
      eq(badgeExternals.badgeBackpackId, badgeBackpacks.id),
    );
  if (row === undefined) return {};
  const b = { ...row.badgeExternal, badgeBackpack: row.badgeBackpack };
  return { badgeExternal: b };
};