import type { UserGradeId } from "@soco/school-db/schema/userGrades";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/school-db";
import { db } from "@soco/school-db/client";
import { grades } from "@soco/school-db/schema/grades";
import {
  userGradeIdSchema,
  userGrades,
} from "@soco/school-db/schema/userGrades";

export const getUserGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ userGrade: userGrades, grade: grades })
    .from(userGrades)
    .leftJoin(grades, eq(userGrades.gradeId, grades.id))
    .where(eq(userGrades.userId, session?.user.id!));
  const u = rows.map((r) => ({ ...r.userGrade, grade: r.grade }));
  return { userGrades: u };
};

export const getUserGradeById = async (id: UserGradeId) => {
  const { session } = await getUserAuth();
  const { id: userGradeId } = userGradeIdSchema.parse({ id });
  const [row] = await db
    .select({ userGrade: userGrades, grade: grades })
    .from(userGrades)
    .where(
      and(
        eq(userGrades.id, userGradeId),
        eq(userGrades.userId, session?.user.id!),
      ),
    )
    .leftJoin(grades, eq(userGrades.gradeId, grades.id));
  if (row === undefined) return {};
  const u = { ...row.userGrade, grade: row.grade };
  return { userGrade: u };
};
