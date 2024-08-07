import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type LessonPageId, 
  type NewLessonPageParams,
  type UpdateLessonPageParams, 
  updateLessonPageSchema,
  insertLessonPageSchema, 
  lessonPages,
  lessonPageIdSchema 
} from "@/lib/db/schema/lessonPages";

export const createLessonPage = async (lessonPage: NewLessonPageParams) => {
  const newLessonPage = insertLessonPageSchema.parse(lessonPage);
  try {
    const [l] =  await db.insert(lessonPages).values(newLessonPage).returning();
    return { lessonPage: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonPage = async (id: LessonPageId, lessonPage: UpdateLessonPageParams) => {
  const { id: lessonPageId } = lessonPageIdSchema.parse({ id });
  const newLessonPage = updateLessonPageSchema.parse(lessonPage);
  try {
    const [l] =  await db
     .update(lessonPages)
     .set({...newLessonPage, updatedAt: new Date() })
     .where(eq(lessonPages.id, lessonPageId!))
     .returning();
    return { lessonPage: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonPage = async (id: LessonPageId) => {
  const { id: lessonPageId } = lessonPageIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(lessonPages).where(eq(lessonPages.id, lessonPageId!))
    .returning();
    return { lessonPage: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

