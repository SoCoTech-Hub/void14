import type { SubjectId } from "@soco/subject-db/schema/subjects";
import { eq } from "@soco/subject-db";
import { db } from "@soco/subject-db/client";
import { subjectIdSchema, subjects } from "@soco/subject-db/schema/subjects";

export const getSubjects = async () => {
  const rows = await db.select().from(subjects);
  const s = rows;
  return { subjects: s };
};

export const getSubjectById = async (id: SubjectId) => {
  const { id: subjectId } = subjectIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, subjectId));
  if (row === undefined) return {};
  const s = row;
  return { subject: s };
};
