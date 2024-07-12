import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AffiliatesSettingId, 
  type NewAffiliatesSettingParams,
  type UpdateAffiliatesSettingParams, 
  updateAffiliatesSettingSchema,
  insertAffiliatesSettingSchema, 
  affiliatesSettings,
  affiliatesSettingIdSchema 
} from "@/lib/db/schema/affiliatesSettings";

export const createAffiliatesSetting = async (affiliatesSetting: NewAffiliatesSettingParams) => {
  const newAffiliatesSetting = insertAffiliatesSettingSchema.parse(affiliatesSetting);
  try {
    const [a] =  await db.insert(affiliatesSettings).values(newAffiliatesSetting).returning();
    return { affiliatesSetting: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAffiliatesSetting = async (id: AffiliatesSettingId, affiliatesSetting: UpdateAffiliatesSettingParams) => {
  const { id: affiliatesSettingId } = affiliatesSettingIdSchema.parse({ id });
  const newAffiliatesSetting = updateAffiliatesSettingSchema.parse(affiliatesSetting);
  try {
    const [a] =  await db
     .update(affiliatesSettings)
     .set(newAffiliatesSetting)
     .where(eq(affiliatesSettings.id, affiliatesSettingId!))
     .returning();
    return { affiliatesSetting: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAffiliatesSetting = async (id: AffiliatesSettingId) => {
  const { id: affiliatesSettingId } = affiliatesSettingIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(affiliatesSettings).where(eq(affiliatesSettings.id, affiliatesSettingId!))
    .returning();
    return { affiliatesSetting: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

