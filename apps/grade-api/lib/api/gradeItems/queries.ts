import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradeItemId, gradeItemIdSchema, gradeItems } from "@/lib/db/schema/gradeItems";

export const getGradeItems = async () => {
  const rows = await db.select().from(gradeItems);
  const g = rows
  return { gradeItems: g };
};

export const getGradeItemById = async (id: GradeItemId) => {
  const { id: gradeItemId } = gradeItemIdSchema.parse({ id });
  const [row] = await db.select().from(gradeItems).where(eq(gradeItems.id, gradeItemId));
  if (row === undefined) return {};
  const g = row;
  return { gradeItem: g };
};


