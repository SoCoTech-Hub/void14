import type {
  LtiToolSettingId,
  NewLtiToolSettingParams,
  UpdateLtiToolSettingParams,
} from "@soco/lti-db/schema/ltiToolSettings";
import { eq } from "@soco/lti-db";
import { db } from "@soco/lti-db/client";
import {
  insertLtiToolSettingSchema,
  ltiToolSettingIdSchema,
  ltiToolSettings,
  updateLtiToolSettingSchema,
} from "@soco/lti-db/schema/ltiToolSettings";

export const createLtiToolSetting = async (
  ltiToolSetting: NewLtiToolSettingParams,
) => {
  const newLtiToolSetting = insertLtiToolSettingSchema.parse(ltiToolSetting);
  try {
    const [l] = await db
      .insert(ltiToolSettings)
      .values(newLtiToolSetting)
      .returning();
    return { ltiToolSetting: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiToolSetting = async (
  id: LtiToolSettingId,
  ltiToolSetting: UpdateLtiToolSettingParams,
) => {
  const { id: ltiToolSettingId } = ltiToolSettingIdSchema.parse({ id });
  const newLtiToolSetting = updateLtiToolSettingSchema.parse(ltiToolSetting);
  try {
    const [l] = await db
      .update(ltiToolSettings)
      .set({ ...newLtiToolSetting, updatedAt: new Date() })
      .where(eq(ltiToolSettings.id, ltiToolSettingId!))
      .returning();
    return { ltiToolSetting: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiToolSetting = async (id: LtiToolSettingId) => {
  const { id: ltiToolSettingId } = ltiToolSettingIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(ltiToolSettings)
      .where(eq(ltiToolSettings.id, ltiToolSettingId!))
      .returning();
    return { ltiToolSetting: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
