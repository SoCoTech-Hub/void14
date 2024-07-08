import { db } from "@soco/mnet-db/index";
import { eq } from "drizzle-orm";
import { 
  MnetServiceEnrolCourseId, 
  NewMnetServiceEnrolCourseParams,
  UpdateMnetServiceEnrolCourseParams, 
  updateMnetServiceEnrolCourseSchema,
  insertMnetServiceEnrolCourseSchema, 
  mnetServiceEnrolCourses,
  mnetServiceEnrolCourseIdSchema 
} from "@soco/mnet-db/schema/mnetServiceEnrolCourses";

export const createMnetServiceEnrolCourse = async (mnetServiceEnrolCourse: NewMnetServiceEnrolCourseParams) => {
  const newMnetServiceEnrolCourse = insertMnetServiceEnrolCourseSchema.parse(mnetServiceEnrolCourse);
  try {
    const [m] =  await db.insert(mnetServiceEnrolCourses).values(newMnetServiceEnrolCourse).returning();
    return { mnetServiceEnrolCourse: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetServiceEnrolCourse = async (id: MnetServiceEnrolCourseId, mnetServiceEnrolCourse: UpdateMnetServiceEnrolCourseParams) => {
  const { id: mnetServiceEnrolCourseId } = mnetServiceEnrolCourseIdSchema.parse({ id });
  const newMnetServiceEnrolCourse = updateMnetServiceEnrolCourseSchema.parse(mnetServiceEnrolCourse);
  try {
    const [m] =  await db
     .update(mnetServiceEnrolCourses)
     .set(newMnetServiceEnrolCourse)
     .where(eq(mnetServiceEnrolCourses.id, mnetServiceEnrolCourseId!))
     .returning();
    return { mnetServiceEnrolCourse: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetServiceEnrolCourse = async (id: MnetServiceEnrolCourseId) => {
  const { id: mnetServiceEnrolCourseId } = mnetServiceEnrolCourseIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetServiceEnrolCourses).where(eq(mnetServiceEnrolCourses.id, mnetServiceEnrolCourseId!))
    .returning();
    return { mnetServiceEnrolCourse: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

