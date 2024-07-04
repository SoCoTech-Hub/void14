import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type UserGradeId, userGradeIdSchema, userGrades } from "@/lib/db/schema/userGrades";
import { grades } from "@/lib/db/schema/grades";

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


