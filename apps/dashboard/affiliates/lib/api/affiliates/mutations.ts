import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  AffiliateId, 
  NewAffiliateParams,
  UpdateAffiliateParams, 
  updateAffiliateSchema,
  insertAffiliateSchema, 
  affiliates,
  affiliateIdSchema 
} from "@/lib/db/schema/affiliates";
import { getUserAuth } from "@/lib/auth/utils";

export const createAffiliate = async (affiliate: NewAffiliateParams) => {
  const { session } = await getUserAuth();
  const newAffiliate = insertAffiliateSchema.parse({ ...affiliate, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(affiliates).values(newAffiliate).returning();
    return { affiliate: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAffiliate = async (id: AffiliateId, affiliate: UpdateAffiliateParams) => {
  const { session } = await getUserAuth();
  const { id: affiliateId } = affiliateIdSchema.parse({ id });
  const newAffiliate = updateAffiliateSchema.parse({ ...affiliate, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(affiliates)
     .set(newAffiliate)
     .where(and(eq(affiliates.id, affiliateId!), eq(affiliates.userId, session?.user.id!)))
     .returning();
    return { affiliate: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAffiliate = async (id: AffiliateId) => {
  const { session } = await getUserAuth();
  const { id: affiliateId } = affiliateIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(affiliates).where(and(eq(affiliates.id, affiliateId!), eq(affiliates.userId, session?.user.id!)))
    .returning();
    return { affiliate: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

