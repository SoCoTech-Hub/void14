import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertSubjectSchema,
  NewSubjectParams,
  SubjectId,
  subjectIdSchema,
  subjects,
  UpdateSubjectParams,
  updateSubjectSchema,
} from "../db/schema/subjects";

export const createSubject = async (subject: NewSubjectParams) => {
  const newSubject = insertSubjectSchema.parse(subject);
  try {
    const [s] = await db.insert(subjects).values(newSubject).returning();
    return { subject: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSubject = async (
  id: SubjectId,
  subject: UpdateSubjectParams,
) => {
  const { id: subjectId } = subjectIdSchema.parse({ id });
  const newSubject = updateSubjectSchema.parse(subject);
  try {
    const [s] = await db
      .update(subjects)
      .set(newSubject)
      .where(eq(subjects.id, subjectId!))
      .returning();
    return { subject: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSubject = async (id: SubjectId) => {
  const { id: subjectId } = subjectIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(subjects)
      .where(eq(subjects.id, subjectId!))
      .returning();
    return { subject: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};