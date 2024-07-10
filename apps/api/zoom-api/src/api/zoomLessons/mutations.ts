import { db } from "@soco/zoom-db/client";
import { and, eq } from "@soco/zoom-db";
import { 
  ZoomLessonId, 
  NewZoomLessonParams,
  UpdateZoomLessonParams, 
  updateZoomLessonSchema,
  insertZoomLessonSchema, 
  zoomLessons,
  zoomLessonIdSchema 
} from "@soco/zoom-db/schema/zoomLessons";
import { getUserAuth } from "@/lib/auth/utils";

export const createZoomLesson = async (zoomLesson: NewZoomLessonParams) => {
  const { session } = await getUserAuth();
  const newZoomLesson = insertZoomLessonSchema.parse({ ...zoomLesson, userId: session?.user.id! });
  try {
    const [z] =  await db.insert(zoomLessons).values(newZoomLesson).returning();
    return { zoomLesson: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateZoomLesson = async (id: ZoomLessonId, zoomLesson: UpdateZoomLessonParams) => {
  const { session } = await getUserAuth();
  const { id: zoomLessonId } = zoomLessonIdSchema.parse({ id });
  const newZoomLesson = updateZoomLessonSchema.parse({ ...zoomLesson, userId: session?.user.id! });
  try {
    const [z] =  await db
     .update(zoomLessons)
     .set(newZoomLesson)
     .where(and(eq(zoomLessons.id, zoomLessonId!), eq(zoomLessons.userId, session?.user.id!)))
     .returning();
    return { zoomLesson: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteZoomLesson = async (id: ZoomLessonId) => {
  const { session } = await getUserAuth();
  const { id: zoomLessonId } = zoomLessonIdSchema.parse({ id });
  try {
    const [z] =  await db.delete(zoomLessons).where(and(eq(zoomLessons.id, zoomLessonId!), eq(zoomLessons.userId, session?.user.id!)))
    .returning();
    return { zoomLesson: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

