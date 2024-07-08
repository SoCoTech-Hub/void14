import { db } from "@soco/grade-db/index";
import { eq } from "drizzle-orm";
import { 
  GradingInstanceId, 
  NewGradingInstanceParams,
  UpdateGradingInstanceParams, 
  updateGradingInstanceSchema,
  insertGradingInstanceSchema, 
  gradingInstances,
  gradingInstanceIdSchema 
} from "@soco/grade-db/schema/gradingInstances";

export const createGradingInstance = async (gradingInstance: NewGradingInstanceParams) => {
  const newGradingInstance = insertGradingInstanceSchema.parse(gradingInstance);
  try {
    const [g] =  await db.insert(gradingInstances).values(newGradingInstance).returning();
    return { gradingInstance: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingInstance = async (id: GradingInstanceId, gradingInstance: UpdateGradingInstanceParams) => {
  const { id: gradingInstanceId } = gradingInstanceIdSchema.parse({ id });
  const newGradingInstance = updateGradingInstanceSchema.parse(gradingInstance);
  try {
    const [g] =  await db
     .update(gradingInstances)
     .set({...newGradingInstance, updatedAt: new Date() })
     .where(eq(gradingInstances.id, gradingInstanceId!))
     .returning();
    return { gradingInstance: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingInstance = async (id: GradingInstanceId) => {
  const { id: gradingInstanceId } = gradingInstanceIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradingInstances).where(eq(gradingInstances.id, gradingInstanceId!))
    .returning();
    return { gradingInstance: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

