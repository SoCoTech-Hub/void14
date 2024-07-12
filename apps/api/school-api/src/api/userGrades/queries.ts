import { db } from "@soco/school-db/client";
import { eq, and } from "@soco/school-db";
import { getUserAuth } from "@soco/auth-service";
import { type UserGradeId, userGradeIdSchema, userGrades } from "@soco/school-db/schema/userGrades";
import { grades } from "@soco/school-db/schema/grades";

export const getUserGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ userGrade: userGrades, grade: grades }).from(userGrades).leftJoin(grades, eq(userGrades.gradeId, grades.id)).where(eq(userGrades.userId, session?.user.id!));
  const u = rows .map((r) => ({ ...r.userGrade, grade: r.grade})); 
  return { userGrades: u };
};

export const getUserGradeById = async (id: UserGradeId) => {
  const { session } = await getUserAuth();
  const { id: userGradeId } = userGradeIdSchema.parse({ id });
  const [row] = await db.select({ userGrade: userGrades, grade: grades }).from(userGrades).where(and(eq(userGrades.id, userGradeId), eq(userGrades.userId, session?.user.id!))).leftJoin(grades, eq(userGrades.gradeId, grades.id));
  if (row === undefined) return {};
  const u =  { ...row.userGrade, grade: row.grade } ;
  return { userGrade: u };
};


