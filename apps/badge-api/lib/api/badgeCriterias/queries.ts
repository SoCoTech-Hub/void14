import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BadgeCriteriaId, badgeCriteriaIdSchema, badgeCriterias } from "@/lib/db/schema/badgeCriterias";
import { badges } from "@/lib/db/schema/badges";

export const getBadgeCriterias = async () => {
  const rows = await db.select({ badgeCriteria: badgeCriterias, badge: badges }).from(badgeCriterias).leftJoin(badges, eq(badgeCriterias.badgeId, badges.id));
  const b = rows .map((r) => ({ ...r.badgeCriteria, badge: r.badge})); 
  return { badgeCriterias: b };
};

export const getBadgeCriteriaById = async (id: BadgeCriteriaId) => {
  const { id: badgeCriteriaId } = badgeCriteriaIdSchema.parse({ id });
  const [row] = await db.select({ badgeCriteria: badgeCriterias, badge: badges }).from(badgeCriterias).where(eq(badgeCriterias.id, badgeCriteriaId)).leftJoin(badges, eq(badgeCriterias.badgeId, badges.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeCriteria, badge: row.badge } ;
  return { badgeCriteria: b };
};


