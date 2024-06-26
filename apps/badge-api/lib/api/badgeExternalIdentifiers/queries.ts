import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BadgeExternalIdentifierId, badgeExternalIdentifierIdSchema, badgeExternalIdentifiers } from "@/lib/db/schema/badgeExternalIdentifiers";
import { badgeBackpacks } from "@/lib/db/schema/badgeBackpacks";

export const getBadgeExternalIdentifiers = async () => {
  const rows = await db.select({ badgeExternalIdentifier: badgeExternalIdentifiers, badgeBackpack: badgeBackpacks }).from(badgeExternalIdentifiers).leftJoin(badgeBackpacks, eq(badgeExternalIdentifiers.badgeBackpackId, badgeBackpacks.id));
  const b = rows .map((r) => ({ ...r.badgeExternalIdentifier, badgeBackpack: r.badgeBackpack})); 
  return { badgeExternalIdentifiers: b };
};

export const getBadgeExternalIdentifierById = async (id: BadgeExternalIdentifierId) => {
  const { id: badgeExternalIdentifierId } = badgeExternalIdentifierIdSchema.parse({ id });
  const [row] = await db.select({ badgeExternalIdentifier: badgeExternalIdentifiers, badgeBackpack: badgeBackpacks }).from(badgeExternalIdentifiers).where(eq(badgeExternalIdentifiers.id, badgeExternalIdentifierId)).leftJoin(badgeBackpacks, eq(badgeExternalIdentifiers.badgeBackpackId, badgeBackpacks.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeExternalIdentifier, badgeBackpack: row.badgeBackpack } ;
  return { badgeExternalIdentifier: b };
};


