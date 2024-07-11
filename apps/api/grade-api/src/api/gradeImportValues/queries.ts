import type { GradeImportValueId } from "@soco/grade-db/schema/gradeImportValues";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeImportValueIdSchema,
  gradeImportValues,
} from "@soco/grade-db/schema/gradeImportValues";

export const getGradeImportValues = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(gradeImportValues)
    .where(eq(gradeImportValues.userId, session?.user.id!));
  const g = rows;
  return { gradeImportValues: g };
};

export const getGradeImportValueById = async (id: GradeImportValueId) => {
  const { session } = await getUserAuth();
  const { id: gradeImportValueId } = gradeImportValueIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradeImportValues)
    .where(
      and(
        eq(gradeImportValues.id, gradeImportValueId),
        eq(gradeImportValues.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { gradeImportValue: g };
};
