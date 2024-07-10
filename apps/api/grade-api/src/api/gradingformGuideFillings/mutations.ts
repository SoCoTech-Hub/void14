import { db } from "@soco/grade-db/client";
import { eq } from "@soco/grade-db";
import { 
  GradingformGuideFillingId, 
  NewGradingformGuideFillingParams,
  UpdateGradingformGuideFillingParams, 
  updateGradingformGuideFillingSchema,
  insertGradingformGuideFillingSchema, 
  gradingformGuideFillings,
  gradingformGuideFillingIdSchema 
} from "@soco/grade-db/schema/gradingformGuideFillings";

export const createGradingformGuideFilling = async (gradingformGuideFilling: NewGradingformGuideFillingParams) => {
  const newGradingformGuideFilling = insertGradingformGuideFillingSchema.parse(gradingformGuideFilling);
  try {
    const [g] =  await db.insert(gradingformGuideFillings).values(newGradingformGuideFilling).returning();
    return { gradingformGuideFilling: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformGuideFilling = async (id: GradingformGuideFillingId, gradingformGuideFilling: UpdateGradingformGuideFillingParams) => {
  const { id: gradingformGuideFillingId } = gradingformGuideFillingIdSchema.parse({ id });
  const newGradingformGuideFilling = updateGradingformGuideFillingSchema.parse(gradingformGuideFilling);
  try {
    const [g] =  await db
     .update(gradingformGuideFillings)
     .set(newGradingformGuideFilling)
     .where(eq(gradingformGuideFillings.id, gradingformGuideFillingId!))
     .returning();
    return { gradingformGuideFilling: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformGuideFilling = async (id: GradingformGuideFillingId) => {
  const { id: gradingformGuideFillingId } = gradingformGuideFillingIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradingformGuideFillings).where(eq(gradingformGuideFillings.id, gradingformGuideFillingId!))
    .returning();
    return { gradingformGuideFilling: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

