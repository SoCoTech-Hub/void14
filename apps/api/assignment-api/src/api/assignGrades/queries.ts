import type { AssignGradeId } from "@soco/assignment-db/schema/assignGrades";
import { and, eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignGradeIdSchema,
  assignGrades,
} from "@soco/assignment-db/schema/assignGrades";
import { assignments } from "@soco/assignment-db/schema/assignments";
import { getUserAuth } from "@soco/auth-service";

export const getAssignGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ assignGrade: assignGrades, assignment: assignments })
    .from(assignGrades)
    .leftJoin(assignments, eq(assignGrades.assignmentId, assignments.id))
    .where(eq(assignGrades.userId, session?.user.id!));
  const a = rows.map((r) => ({ ...r.assignGrade, assignment: r.assignment }));
  return { assignGrades: a };
};

export const getAssignGradeById = async (id: AssignGradeId) => {
  const { session } = await getUserAuth();
  const { id: assignGradeId } = assignGradeIdSchema.parse({ id });
  const [row] = await db
    .select({ assignGrade: assignGrades, assignment: assignments })
    .from(assignGrades)
    .where(
      and(
        eq(assignGrades.id, assignGradeId),
        eq(assignGrades.userId, session?.user.id!),
      ),
    )
    .leftJoin(assignments, eq(assignGrades.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a = { ...row.assignGrade, assignment: row.assignment };
  return { assignGrade: a };
};
