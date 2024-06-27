import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  CourseFormatOptionId, 
  NewCourseFormatOptionParams,
  UpdateCourseFormatOptionParams, 
  updateCourseFormatOptionSchema,
  insertCourseFormatOptionSchema, 
  courseFormatOptions,
  courseFormatOptionIdSchema 
} from "@/lib/db/schema/courseFormatOptions";

export const createCourseFormatOption = async (courseFormatOption: NewCourseFormatOptionParams) => {
  const newCourseFormatOption = insertCourseFormatOptionSchema.parse(courseFormatOption);
  try {
    const [c] =  await db.insert(courseFormatOptions).values(newCourseFormatOption).returning();
    return { courseFormatOption: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseFormatOption = async (id: CourseFormatOptionId, courseFormatOption: UpdateCourseFormatOptionParams) => {
  const { id: courseFormatOptionId } = courseFormatOptionIdSchema.parse({ id });
  const newCourseFormatOption = updateCourseFormatOptionSchema.parse(courseFormatOption);
  try {
    const [c] =  await db
     .update(courseFormatOptions)
     .set(newCourseFormatOption)
     .where(eq(courseFormatOptions.id, courseFormatOptionId!))
     .returning();
    return { courseFormatOption: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseFormatOption = async (id: CourseFormatOptionId) => {
  const { id: courseFormatOptionId } = courseFormatOptionIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(courseFormatOptions).where(eq(courseFormatOptions.id, courseFormatOptionId!))
    .returning();
    return { courseFormatOption: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

