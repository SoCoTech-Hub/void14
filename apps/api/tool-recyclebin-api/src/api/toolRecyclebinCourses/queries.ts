import { db } from "@soco/tool-recyclebin-db/client";
import { eq } from "@soco/tool-recyclebin-db";
import { type ToolRecyclebinCourseId, toolRecyclebinCourseIdSchema, toolRecyclebinCourses } from "@soco/tool-recyclebin-db/schema/toolRecyclebinCourses";

export const getToolRecyclebinCourses = async () => {
  const rows = await db.select().from(toolRecyclebinCourses);
  const t = rows
  return { toolRecyclebinCourses: t };
};

export const getToolRecyclebinCourseById = async (id: ToolRecyclebinCourseId) => {
  const { id: toolRecyclebinCourseId } = toolRecyclebinCourseIdSchema.parse({ id });
  const [row] = await db.select().from(toolRecyclebinCourses).where(eq(toolRecyclebinCourses.id, toolRecyclebinCourseId));
  if (row === undefined) return {};
  const t = row;
  return { toolRecyclebinCourse: t };
};


