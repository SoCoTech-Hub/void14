import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ExternalServiceId, 
  NewExternalServiceParams,
  UpdateExternalServiceParams, 
  updateExternalServiceSchema,
  insertExternalServiceSchema, 
  externalServices,
  externalServiceIdSchema 
} from "@/lib/db/schema/externalServices";

export const createExternalService = async (externalService: NewExternalServiceParams) => {
  const newExternalService = insertExternalServiceSchema.parse(externalService);
  try {
    const [e] =  await db.insert(externalServices).values(newExternalService).returning();
    return { externalService: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateExternalService = async (id: ExternalServiceId, externalService: UpdateExternalServiceParams) => {
  const { id: externalServiceId } = externalServiceIdSchema.parse({ id });
  const newExternalService = updateExternalServiceSchema.parse(externalService);
  try {
    const [e] =  await db
     .update(externalServices)
     .set({...newExternalService, updatedAt: new Date() })
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
    const [e] =  await db.delete(externalServices).where(eq(externalServices.id, externalServiceId!))
    .returning();
    return { externalService: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

