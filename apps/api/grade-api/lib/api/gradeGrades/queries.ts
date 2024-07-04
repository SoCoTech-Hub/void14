import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { GradeGradeId } from "../db/schema/gradeGrades";
import { db } from "../db/index";
import { gradeGradeIdSchema, gradeGrades } from "../db/schema/gradeGrades";

export const getGradeGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(gradeGrades)
    .where(eq(gradeGrades.userId, session?.user.id!));
  const g = rows;
  return { gradeGrades: g };
};

export const getGradeGradeById = async (id: GradeGradeId) => {
  const { session } = await getUserAuth();
  const { id: gradeGradeId } = gradeGradeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradeGrades)
    .where(
      and(
        eq(gradeGrades.id, gradeGradeId),
        eq(gradeGrades.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { gradeGrade: g };
};
