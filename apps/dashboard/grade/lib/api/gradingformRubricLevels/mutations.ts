import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type GradingformRubricLevelId, 
  type NewGradingformRubricLevelParams,
  type UpdateGradingformRubricLevelParams, 
  updateGradingformRubricLevelSchema,
  insertGradingformRubricLevelSchema, 
  gradingformRubricLevels,
  gradingformRubricLevelIdSchema 
} from "@/lib/db/schema/gradingformRubricLevels";

export const createGradingformRubricLevel = async (gradingformRubricLevel: NewGradingformRubricLevelParams) => {
  const newGradingformRubricLevel = insertGradingformRubricLevelSchema.parse(gradingformRubricLevel);
  try {
    const [g] =  await db.insert(gradingformRubricLevels).values(newGradingformRubricLevel).returning();
    return { gradingformRubricLevel: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformRubricLevel = async (id: GradingformRubricLevelId, gradingformRubricLevel: UpdateGradingformRubricLevelParams) => {
  const { id: gradingformRubricLevelId } = gradingformRubricLevelIdSchema.parse({ id });
  const newGradingformRubricLevel = updateGradingformRubricLevelSchema.parse(gradingformRubricLevel);
  try {
    const [g] =  await db
     .update(gradingformRubricLevels)
     .set(newGradingformRubricLevel)
     .where(eq(gradingformRubricLevels.id, gradingformRubricLevelId!))
     .returning();
    return { gradingformRubricLevel: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformRubricLevel = async (id: GradingformRubricLevelId) => {
  const { id: gradingformRubricLevelId } = gradingformRubricLevelIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradingformRubricLevels).where(eq(gradingformRubricLevels.id, gradingformRubricLevelId!))
    .returning();
    return { gradingformRubricLevel: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

