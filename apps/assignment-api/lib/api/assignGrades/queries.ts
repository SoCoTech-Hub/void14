import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AssignGradeId, assignGradeIdSchema, assignGrades } from "@/lib/db/schema/assignGrades";
import { assignments } from "@/lib/db/schema/assignments";

export const getAssignGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ assignGrade: assignGrades, assignment: assignments }).from(assignGrades).leftJoin(assignments, eq(assignGrades.assignmentId, assignments.id)).where(eq(assignGrades.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.assignGrade, assignment: r.assignment})); 
  return { assignGrades: a };
};

export const getAssignGradeById = async (id: AssignGradeId) => {
  const { session } = await getUserAuth();
  const { id: assignGradeId } = assignGradeIdSchema.parse({ id });
  const [row] = await db.select({ assignGrade: assignGrades, assignment: assignments }).from(assignGrades).where(and(eq(assignGrades.id, assignGradeId), eq(assignGrades.userId, session?.user.id!))).leftJoin(assignments, eq(assignGrades.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a =  { ...row.assignGrade, assignment: row.assignment } ;
  return { assignGrade: a };
};


