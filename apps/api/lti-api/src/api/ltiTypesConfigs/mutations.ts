import type {
  LtiTypesConfigId,
  NewLtiTypesConfigParams,
  UpdateLtiTypesConfigParams,
} from "@soco/lti-db/schema/ltiTypesConfigs";
import { eq } from "@soco/lti-db";
import { db } from "@soco/lti-db/client";
import {
  insertLtiTypesConfigSchema,
  ltiTypesConfigIdSchema,
  ltiTypesConfigs,
  updateLtiTypesConfigSchema,
} from "@soco/lti-db/schema/ltiTypesConfigs";

export const createLtiTypesConfig = async (
  ltiTypesConfig: NewLtiTypesConfigParams,
) => {
  const newLtiTypesConfig = insertLtiTypesConfigSchema.parse(ltiTypesConfig);
  try {
    const [l] = await db
      .insert(ltiTypesConfigs)
      .values(newLtiTypesConfig)
      .returning();
    return { ltiTypesConfig: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiTypesConfig = async (
  id: LtiTypesConfigId,
  ltiTypesConfig: UpdateLtiTypesConfigParams,
) => {
  const { id: ltiTypesConfigId } = ltiTypesConfigIdSchema.parse({ id });
  const newLtiTypesConfig = updateLtiTypesConfigSchema.parse(ltiTypesConfig);
  try {
    const [l] = await db
      .update(ltiTypesConfigs)
      .set(newLtiTypesConfig)
      .where(eq(ltiTypesConfigs.id, ltiTypesConfigId!))
      .returning();
    return { ltiTypesConfig: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiTypesConfig = async (id: LtiTypesConfigId) => {
  const { id: ltiTypesConfigId } = ltiTypesConfigIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(ltiTypesConfigs)
      .where(eq(ltiTypesConfigs.id, ltiTypesConfigId!))
      .returning();
    return { ltiTypesConfig: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
