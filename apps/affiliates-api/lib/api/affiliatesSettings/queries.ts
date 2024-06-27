import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AffiliatesSettingId, affiliatesSettingIdSchema, affiliatesSettings } from "@/lib/db/schema/affiliatesSettings";

export const getAffiliatesSettings = async () => {
  const rows = await db.select().from(affiliatesSettings);
  const a = rows
  return { affiliatesSettings: a };
};

export const getAffiliatesSettingById = async (id: AffiliatesSettingId) => {
  const { id: affiliatesSettingId } = affiliatesSettingIdSchema.parse({ id });
  const [row] = await db.select().from(affiliatesSettings).where(eq(affiliatesSettings.id, affiliatesSettingId));
  if (row === undefined) return {};
  const a = row;
  return { affiliatesSetting: a };
};


