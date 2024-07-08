import { db } from "@soco/course-db/index";
import { eq } from "drizzle-orm";
import { 
  CourseSectionId, 
  NewCourseSectionParams,
  UpdateCourseSectionParams, 
  updateCourseSectionSchema,
  insertCourseSectionSchema, 
  courseSections,
  courseSectionIdSchema 
} from "@soco/course-db/schema/courseSections";

export const createCourseSection = async (courseSection: NewCourseSectionParams) => {
  const newCourseSection = insertCourseSectionSchema.parse(courseSection);
  try {
    const [c] =  await db.insert(courseSections).values(newCourseSection).returning();
    return { courseSection: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseSection = async (id: CourseSectionId, courseSection: UpdateCourseSectionParams) => {
  const { id: courseSectionId } = courseSectionIdSchema.parse({ id });
  const newCourseSection = updateCourseSectionSchema.parse(courseSection);
  try {
    const [c] =  await db
     .update(courseSections)
     .set({...newCourseSection, updatedAt: new Date() })
     .where(eq(courseSections.id, courseSectionId!))
     .returning();
    return { courseSection: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseSection = async (id: CourseSectionId) => {
  const { id: courseSectionId } = courseSectionIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(courseSections).where(eq(courseSections.id, courseSectionId!))
    .returning();
    return { courseSection: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

