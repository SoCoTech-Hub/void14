import { eq } from "drizzle-orm";

import type { LtiToolSettingId } from "../../db/schema/ltiToolSettings";
import { db } from "../../db/index";
import {
  ltiToolSettingIdSchema,
  ltiToolSettings,
} from "../../db/schema/ltiToolSettings";

export const getLtiToolSettings = async () => {
  const rows = await db.select().from(ltiToolSettings);
  const l = rows;
  return { ltiToolSettings: l };
};

export const getLtiToolSettingById = async (id: LtiToolSettingId) => {
  const { id: ltiToolSettingId } = ltiToolSettingIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(ltiToolSettings)
    .where(eq(ltiToolSettings.id, ltiToolSettingId));
  if (row === undefined) return {};
  const l = row;
  return { ltiToolSetting: l };
};
