import type {
  EnrolLtiLti2ToolProxyId,
  NewEnrolLtiLti2ToolProxyParams,
  UpdateEnrolLtiLti2ToolProxyParams,
} from "@soco/enrol-db/schema/enrolLtiLti2ToolProxys";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiLti2ToolProxyIdSchema,
  enrolLtiLti2ToolProxys,
  insertEnrolLtiLti2ToolProxySchema,
  updateEnrolLtiLti2ToolProxySchema,
} from "@soco/enrol-db/schema/enrolLtiLti2ToolProxys";

export const createEnrolLtiLti2ToolProxy = async (
  enrolLtiLti2ToolProxy: NewEnrolLtiLti2ToolProxyParams,
) => {
  const newEnrolLtiLti2ToolProxy = insertEnrolLtiLti2ToolProxySchema.parse(
    enrolLtiLti2ToolProxy,
  );
  try {
    const [e] = await db
      .insert(enrolLtiLti2ToolProxys)
      .values(newEnrolLtiLti2ToolProxy)
      .returning();
    return { enrolLtiLti2ToolProxy: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2ToolProxy = async (
  id: EnrolLtiLti2ToolProxyId,
  enrolLtiLti2ToolProxy: UpdateEnrolLtiLti2ToolProxyParams,
) => {
  const { id: enrolLtiLti2ToolProxyId } = enrolLtiLti2ToolProxyIdSchema.parse({
    id,
  });
  const newEnrolLtiLti2ToolProxy = updateEnrolLtiLti2ToolProxySchema.parse(
    enrolLtiLti2ToolProxy,
  );
  try {
    const [e] = await db
      .update(enrolLtiLti2ToolProxys)
      .set({ ...newEnrolLtiLti2ToolProxy, updatedAt: new Date() })
      .where(eq(enrolLtiLti2ToolProxys.id, enrolLtiLti2ToolProxyId!))
      .returning();
    return { enrolLtiLti2ToolProxy: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2ToolProxy = async (
  id: EnrolLtiLti2ToolProxyId,
) => {
  const { id: enrolLtiLti2ToolProxyId } = enrolLtiLti2ToolProxyIdSchema.parse({
    id,
  });
  try {
    const [e] = await db
      .delete(enrolLtiLti2ToolProxys)
      .where(eq(enrolLtiLti2ToolProxys.id, enrolLtiLti2ToolProxyId!))
      .returning();
    return { enrolLtiLti2ToolProxy: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
