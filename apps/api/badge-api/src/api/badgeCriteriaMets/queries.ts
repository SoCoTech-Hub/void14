import { db } from "@soco/badge-db/client";
import { eq, and } from "@soco/badge-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type BadgeCriteriaMetId, badgeCriteriaMetIdSchema, badgeCriteriaMets } from "@soco/badge-db/schema/badgeCriteriaMets";
import { badgeCriterias } from "@soco/badge-db/schema/badgeCriterias";

export const getBadgeCriteriaMets = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ badgeCriteriaMet: badgeCriteriaMets, badgeCriteria: badgeCriterias }).from(badgeCriteriaMets).leftJoin(badgeCriterias, eq(badgeCriteriaMets.badgeCriteriaId, badgeCriterias.id)).where(eq(badgeCriteriaMets.userId, session?.user.id!));
  const b = rows .map((r) => ({ ...r.badgeCriteriaMet, badgeCriteria: r.badgeCriteria})); 
  return { badgeCriteriaMets: b };
};

export const getBadgeCriteriaMetById = async (id: BadgeCriteriaMetId) => {
  const { session } = await getUserAuth();
  const { id: badgeCriteriaMetId } = badgeCriteriaMetIdSchema.parse({ id });
  const [row] = await db.select({ badgeCriteriaMet: badgeCriteriaMets, badgeCriteria: badgeCriterias }).from(badgeCriteriaMets).where(and(eq(badgeCriteriaMets.id, badgeCriteriaMetId), eq(badgeCriteriaMets.userId, session?.user.id!))).leftJoin(badgeCriterias, eq(badgeCriteriaMets.badgeCriteriaId, badgeCriterias.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeCriteriaMet, badgeCriteria: row.badgeCriteria } ;
  return { badgeCriteriaMet: b };
};


