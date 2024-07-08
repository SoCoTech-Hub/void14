import { db } from "@soco/affiliates-db/index";
import { eq } from "drizzle-orm";
import { 
  AffiliatesSettingId, 
  NewAffiliatesSettingParams,
  UpdateAffiliatesSettingParams, 
  updateAffiliatesSettingSchema,
  insertAffiliatesSettingSchema, 
  affiliatesSettings,
  affiliatesSettingIdSchema 
} from "@soco/affiliates-db/schema/affiliatesSettings";

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

