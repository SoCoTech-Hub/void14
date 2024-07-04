import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type GradeGradesHistoryId, gradeGradesHistoryIdSchema, gradeGradesHistories } from "@/lib/db/schema/gradeGradesHistories";

export const getGradeGradesHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(gradeGradesHistories).where(eq(gradeGradesHistories.userId, session?.user.id!));
  const g = rows
  return { gradeGradesHistories: g };
};

export const getGradeGradesHistoryById = async (id: GradeGradesHistoryId) => {
  const { session } = await getUserAuth();
  const { id: gradeGradesHistoryId } = gradeGradesHistoryIdSchema.parse({ id });
  const [row] = await db.select().from(gradeGradesHistories).where(and(eq(gradeGradesHistories.id, gradeGradesHistoryId), eq(gradeGradesHistories.userId, session?.user.id!)));
  if (row === undefined) return {};
  const g = row;
  return { gradeGradesHistory: g };
};


