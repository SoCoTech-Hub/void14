import { db } from "@soco/external-db/index";
import { eq } from "drizzle-orm";
import { 
  ExternalFunctionId, 
  NewExternalFunctionParams,
  UpdateExternalFunctionParams, 
  updateExternalFunctionSchema,
  insertExternalFunctionSchema, 
  externalFunctions,
  externalFunctionIdSchema 
} from "@soco/external-db/schema/externalFunctions";

export const createExternalFunction = async (externalFunction: NewExternalFunctionParams) => {
  const newExternalFunction = insertExternalFunctionSchema.parse(externalFunction);
  try {
    const [e] =  await db.insert(externalFunctions).values(newExternalFunction).returning();
    return { externalFunction: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateExternalFunction = async (id: ExternalFunctionId, externalFunction: UpdateExternalFunctionParams) => {
  const { id: externalFunctionId } = externalFunctionIdSchema.parse({ id });
  const newExternalFunction = updateExternalFunctionSchema.parse(externalFunction);
  try {
    const [e] =  await db
     .update(externalFunctions)
     .set(newExternalFunction)
     .where(eq(externalFunctions.id, externalFunctionId!))
     .returning();
    return { externalFunction: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteExternalFunction = async (id: ExternalFunctionId) => {
  const { id: externalFunctionId } = externalFunctionIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(externalFunctions).where(eq(externalFunctions.id, externalFunctionId!))
    .returning();
    return { externalFunction: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

