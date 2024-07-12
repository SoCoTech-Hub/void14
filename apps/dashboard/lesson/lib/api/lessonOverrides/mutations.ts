import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type LessonOverrideId, 
  type NewLessonOverrideParams,
  type UpdateLessonOverrideParams, 
  updateLessonOverrideSchema,
  insertLessonOverrideSchema, 
  lessonOverrides,
  lessonOverrideIdSchema 
} from "@/lib/db/schema/lessonOverrides";

export const createLessonOverride = async (lessonOverride: NewLessonOverrideParams) => {
  const newLessonOverride = insertLessonOverrideSchema.parse(lessonOverride);
  try {
    const [l] =  await db.insert(lessonOverrides).values(newLessonOverride).returning();
    return { lessonOverride: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonOverride = async (id: LessonOverrideId, lessonOverride: UpdateLessonOverrideParams) => {
  const { id: lessonOverrideId } = lessonOverrideIdSchema.parse({ id });
  const newLessonOverride = updateLessonOverrideSchema.parse(lessonOverride);
  try {
    const [l] =  await db
     .update(lessonOverrides)
     .set(newLessonOverride)
     .where(eq(lessonOverrides.id, lessonOverrideId!))
     .returning();
    return { lessonOverride: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonOverride = async (id: LessonOverrideId) => {
  const { id: lessonOverrideId } = lessonOverrideIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(lessonOverrides).where(eq(lessonOverrides.id, lessonOverrideId!))
    .returning();
    return { lessonOverride: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

