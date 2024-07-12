import { eq } from "@soco/external-db";
import { db } from "@soco/external-db/client";
import {
  ExternalServiceId,
  externalServiceIdSchema,
  externalServices,
  insertExternalServiceSchema,
  NewExternalServiceParams,
  UpdateExternalServiceParams,
  updateExternalServiceSchema,
} from "@soco/external-db/schema/externalServices";

export const createExternalService = async (
  externalService: NewExternalServiceParams,
) => {
  const newExternalService = insertExternalServiceSchema.parse(externalService);
  try {
    const [e] = await db
      .insert(externalServices)
      .values(newExternalService)
      .returning();
    return { externalService: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateExternalService = async (
  id: ExternalServiceId,
  externalService: UpdateExternalServiceParams,
) => {
  const { id: externalServiceId } = externalServiceIdSchema.parse({ id });
  const newExternalService = updateExternalServiceSchema.parse(externalService);
  try {
    const [e] = await db
      .update(externalServices)
      .set({ ...newExternalService, updatedAt: new Date() })
      .where(eq(externalServices.id, externalServiceId!))
      .returning();
    return { externalService: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteExternalService = async (id: ExternalServiceId) => {
  const { id: externalServiceId } = externalServiceIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(externalServices)
      .where(eq(externalServices.id, externalServiceId!))
      .returning();
    return { externalService: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
