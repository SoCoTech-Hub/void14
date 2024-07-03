import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BadgeCriteriaParamId, badgeCriteriaParamIdSchema, badgeCriteriaParams } from "@/lib/db/schema/badgeCriteriaParams";
import { badgeCriterias } from "@/lib/db/schema/badgeCriterias";

export const getBadgeCriteriaParams = async () => {
  const rows = await db.select({ badgeCriteriaParam: badgeCriteriaParams, badgeCriteria: badgeCriterias }).from(badgeCriteriaParams).leftJoin(badgeCriterias, eq(badgeCriteriaParams.badgeCriteriaId, badgeCriterias.id));
  const b = rows .map((r) => ({ ...r.badgeCriteriaParam, badgeCriteria: r.badgeCriteria})); 
  return { badgeCriteriaParams: b };
};

export const getBadgeCriteriaParamById = async (id: BadgeCriteriaParamId) => {
  const { id: badgeCriteriaParamId } = badgeCriteriaParamIdSchema.parse({ id });
  const [row] = await db.select({ badgeCriteriaParam: badgeCriteriaParams, badgeCriteria: badgeCriterias }).from(badgeCriteriaParams).where(eq(badgeCriteriaParams.id, badgeCriteriaParamId)).leftJoin(badgeCriterias, eq(badgeCriteriaParams.badgeCriteriaId, badgeCriterias.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeCriteriaParam, badgeCriteria: row.badgeCriteria } ;
  return { badgeCriteriaParam: b };
};


