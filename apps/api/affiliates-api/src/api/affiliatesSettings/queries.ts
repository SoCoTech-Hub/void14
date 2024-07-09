import type { AffiliatesSettingId } from "@soco/affiliates-db/schema/affiliatesSettings";
import { db, eq } from "@soco/affiliates-db";
import {
  affiliatesSettingIdSchema,
  affiliatesSettings,
} from "@soco/affiliates-db/schema/affiliatesSettings";

export const getAffiliatesSettings = async () => {
  const rows = await db.select().from(affiliatesSettings);
  const a = rows;
  return { affiliatesSettings: a };
};

export const getAffiliatesSettingById = async (id: AffiliatesSettingId) => {
  const { id: affiliatesSettingId } = affiliatesSettingIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(affiliatesSettings)
    .where(eq(affiliatesSettings.id, affiliatesSettingId));
  if (row === undefined) return {};
  const a = row;
  return { affiliatesSetting: a };
};
