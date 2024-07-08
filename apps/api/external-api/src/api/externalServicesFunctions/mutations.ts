import { db } from "@soco/external-db/index";
import { eq } from "drizzle-orm";
import { 
  ExternalServicesFunctionId, 
  NewExternalServicesFunctionParams,
  UpdateExternalServicesFunctionParams, 
  updateExternalServicesFunctionSchema,
  insertExternalServicesFunctionSchema, 
  externalServicesFunctions,
  externalServicesFunctionIdSchema 
} from "@soco/external-db/schema/externalServicesFunctions";

export const createExternalServicesFunction = async (externalServicesFunction: NewExternalServicesFunctionParams) => {
  const newExternalServicesFunction = insertExternalServicesFunctionSchema.parse(externalServicesFunction);
  try {
    const [e] =  await db.insert(externalServicesFunctions).values(newExternalServicesFunction).returning();
    return { externalServicesFunction: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateExternalServicesFunction = async (id: ExternalServicesFunctionId, externalServicesFunction: UpdateExternalServicesFunctionParams) => {
  const { id: externalServicesFunctionId } = externalServicesFunctionIdSchema.parse({ id });
  const newExternalServicesFunction = updateExternalServicesFunctionSchema.parse(externalServicesFunction);
  try {
    const [e] =  await db
     .update(externalServicesFunctions)
     .set(newExternalServicesFunction)
     .where(eq(externalServicesFunctions.id, externalServicesFunctionId!))
     .returning();
    return { externalServicesFunction: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteExternalServicesFunction = async (id: ExternalServicesFunctionId) => {
  const { id: externalServicesFunctionId } = externalServicesFunctionIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(externalServicesFunctions).where(eq(externalServicesFunctions.id, externalServicesFunctionId!))
    .returning();
    return { externalServicesFunction: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

