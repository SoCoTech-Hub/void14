import { db } from "@soco/badge-db/client";
import { eq } from "@soco/badge-db";
import { type BadgeExternalId, badgeExternalIdSchema, badgeExternals } from "@soco/badge-db/schema/badgeExternals";
import { badgeBackpacks } from "@soco/badge-db/schema/badgeBackpacks";

export const getBadgeExternals = async () => {
  const rows = await db.select({ badgeExternal: badgeExternals, badgeBackpack: badgeBackpacks }).from(badgeExternals).leftJoin(badgeBackpacks, eq(badgeExternals.badgeBackpackId, badgeBackpacks.id));
  const b = rows .map((r) => ({ ...r.badgeExternal, badgeBackpack: r.badgeBackpack})); 
  return { badgeExternals: b };
};

export const getBadgeExternalById = async (id: BadgeExternalId) => {
  const { id: badgeExternalId } = badgeExternalIdSchema.parse({ id });
  const [row] = await db.select({ badgeExternal: badgeExternals, badgeBackpack: badgeBackpacks }).from(badgeExternals).where(eq(badgeExternals.id, badgeExternalId)).leftJoin(badgeBackpacks, eq(badgeExternals.badgeBackpackId, badgeBackpacks.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeExternal, badgeBackpack: row.badgeBackpack } ;
  return { badgeExternal: b };
};


