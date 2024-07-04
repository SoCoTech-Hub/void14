import { eq } from "drizzle-orm";

import type { SubjectsSubjectCategoryId } from "../db/schema/subjectsSubjectCategories";
import { db } from "../db/index";
import { subjectCategories } from "../db/schema/subjectCategories";
import { subjects } from "../db/schema/subjects";
import {
  subjectsSubjectCategories,
  subjectsSubjectCategoryIdSchema,
} from "../db/schema/subjectsSubjectCategories";

export const getSubjectsSubjectCategories = async () => {
  const rows = await db
    .select({
      subjectsSubjectCategory: subjectsSubjectCategories,
      subjectCategory: subjectCategories,
      subject: subjects,
    })
    .from(subjectsSubjectCategories)
    .leftJoin(
      subjectCategories,
      eq(subjectsSubjectCategories.subjectCategoryId, subjectCategories.id),
    )
    .leftJoin(subjects, eq(subjectsSubjectCategories.subjectId, subjects.id));
  const s = rows.map((r) => ({
    ...r.subjectsSubjectCategory,
    subjectCategory: r.subjectCategory,
    subject: r.subject,
  }));
  return { subjectsSubjectCategories: s };
};

export const getSubjectsSubjectCategoryById = async (
  id: SubjectsSubjectCategoryId,
) => {
  const { id: subjectsSubjectCategoryId } =
    subjectsSubjectCategoryIdSchema.parse({ id });
  const [row] = await db
    .select({
      subjectsSubjectCategory: subjectsSubjectCategories,
      subjectCategory: subjectCategories,
      subject: subjects,
    })
    .from(subjectsSubjectCategories)
    .where(eq(subjectsSubjectCategories.id, subjectsSubjectCategoryId))
    .leftJoin(
      subjectCategories,
      eq(subjectsSubjectCategories.subjectCategoryId, subjectCategories.id),
    )
    .leftJoin(subjects, eq(subjectsSubjectCategories.subjectId, subjects.id));
  if (row === undefined) return {};
  const s = {
    ...row.subjectsSubjectCategory,
    subjectCategory: row.subjectCategory,
    subject: row.subject,
  };
  return { subjectsSubjectCategory: s };
};
