import { eq } from "drizzle-orm";

import type { ToolRecyclebinCourseId } from "../../db/schema/toolRecyclebinCourses";
import { db } from "../../db/index";
import {
  toolRecyclebinCourseIdSchema,
  toolRecyclebinCourses,
} from "../../db/schema/toolRecyclebinCourses";

export const getToolRecyclebinCourses = async () => {
  const rows = await db.select().from(toolRecyclebinCourses);
  const t = rows;
  return { toolRecyclebinCourses: t };
};

export const getToolRecyclebinCourseById = async (
  id: ToolRecyclebinCourseId,
) => {
  const { id: toolRecyclebinCourseId } = toolRecyclebinCourseIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(toolRecyclebinCourses)
    .where(eq(toolRecyclebinCourses.id, toolRecyclebinCourseId));
  if (row === undefined) return {};
  const t = row;
  return { toolRecyclebinCourse: t };
};
