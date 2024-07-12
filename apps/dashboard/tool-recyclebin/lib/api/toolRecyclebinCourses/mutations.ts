import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ToolRecyclebinCourseId, 
  type NewToolRecyclebinCourseParams,
  type UpdateToolRecyclebinCourseParams, 
  updateToolRecyclebinCourseSchema,
  insertToolRecyclebinCourseSchema, 
  toolRecyclebinCourses,
  toolRecyclebinCourseIdSchema 
} from "@/lib/db/schema/toolRecyclebinCourses";

export const createToolRecyclebinCourse = async (toolRecyclebinCourse: NewToolRecyclebinCourseParams) => {
  const newToolRecyclebinCourse = insertToolRecyclebinCourseSchema.parse(toolRecyclebinCourse);
  try {
    const [t] =  await db.insert(toolRecyclebinCourses).values(newToolRecyclebinCourse).returning();
    return { toolRecyclebinCourse: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolRecyclebinCourse = async (id: ToolRecyclebinCourseId, toolRecyclebinCourse: UpdateToolRecyclebinCourseParams) => {
  const { id: toolRecyclebinCourseId } = toolRecyclebinCourseIdSchema.parse({ id });
  const newToolRecyclebinCourse = updateToolRecyclebinCourseSchema.parse(toolRecyclebinCourse);
  try {
    const [t] =  await db
     .update(toolRecyclebinCourses)
     .set({...newToolRecyclebinCourse, updatedAt: new Date() })
     .where(eq(toolRecyclebinCourses.id, toolRecyclebinCourseId!))
     .returning();
    return { toolRecyclebinCourse: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolRecyclebinCourse = async (id: ToolRecyclebinCourseId) => {
  const { id: toolRecyclebinCourseId } = toolRecyclebinCourseIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolRecyclebinCourses).where(eq(toolRecyclebinCourses.id, toolRecyclebinCourseId!))
    .returning();
    return { toolRecyclebinCourse: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

