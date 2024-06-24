import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AffiliatesDetailId, affiliatesDetailIdSchema, affiliatesDetails } from "@/lib/db/schema/affiliatesDetails";
import { affiliates } from "@/lib/db/schema/affiliates";

export const getAffiliatesDetails = async () => {
  const rows = await db.select({ affiliatesDetail: affiliatesDetails, affiliate: affiliates }).from(affiliatesDetails).leftJoin(affiliates, eq(affiliatesDetails.affiliateId, affiliates.id));
  const a = rows .map((r) => ({ ...r.affiliatesDetail, affiliate: r.affiliate})); 
  return { affiliatesDetails: a };
};

export const getAffiliatesDetailById = async (id: AffiliatesDetailId) => {
  const { id: affiliatesDetailId } = affiliatesDetailIdSchema.parse({ id });
  const [row] = await db.select({ affiliatesDetail: affiliatesDetails, affiliate: affiliates }).from(affiliatesDetails).where(eq(affiliatesDetails.id, affiliatesDetailId)).leftJoin(affiliates, eq(affiliatesDetails.affiliateId, affiliates.id));
  if (row === undefined) return {};
  const a =  { ...row.affiliatesDetail, affiliate: row.affiliate } ;
  return { affiliatesDetail: a };
};


