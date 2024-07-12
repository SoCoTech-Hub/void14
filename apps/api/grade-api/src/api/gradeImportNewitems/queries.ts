import type { GradeImportNewitemId } from "@soco/grade-db/schema/gradeImportNewitems";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeImportNewitemIdSchema,
  gradeImportNewitems,
} from "@soco/grade-db/schema/gradeImportNewitems";

export const getGradeImportNewitems = async () => {
  const rows = await db.select().from(gradeImportNewitems);
  const g = rows;
  return { gradeImportNewitems: g };
};

export const getGradeImportNewitemById = async (id: GradeImportNewitemId) => {
  const { id: gradeImportNewitemId } = gradeImportNewitemIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradeImportNewitems)
    .where(eq(gradeImportNewitems.id, gradeImportNewitemId));
  if (row === undefined) return {};
  const g = row;
  return { gradeImportNewitem: g };
};
