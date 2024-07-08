import { db } from "@soco/subject-db/index";
import { eq } from "drizzle-orm";
import { type SubjectsSubjectCategoryId, subjectsSubjectCategoryIdSchema, subjectsSubjectCategories } from "@soco/subject-db/schema/subjectsSubjectCategories";
import { subjectCategories } from "@soco/subject-db/schema/subjectCategories";
import { subjects } from "@soco/subject-db/schema/subjects";

export const getSubjectsSubjectCategories = async () => {
  const rows = await db.select({ subjectsSubjectCategory: subjectsSubjectCategories, subjectCategory: subjectCategories, subject: subjects }).from(subjectsSubjectCategories).leftJoin(subjectCategories, eq(subjectsSubjectCategories.subjectCategoryId, subjectCategories.id)).leftJoin(subjects, eq(subjectsSubjectCategories.subjectId, subjects.id));
  const s = rows .map((r) => ({ ...r.subjectsSubjectCategory, subjectCategory: r.subjectCategory, subject: r.subject})); 
  return { subjectsSubjectCategories: s };
};

export const getSubjectsSubjectCategoryById = async (id: SubjectsSubjectCategoryId) => {
  const { id: subjectsSubjectCategoryId } = subjectsSubjectCategoryIdSchema.parse({ id });
  const [row] = await db.select({ subjectsSubjectCategory: subjectsSubjectCategories, subjectCategory: subjectCategories, subject: subjects }).from(subjectsSubjectCategories).where(eq(subjectsSubjectCategories.id, subjectsSubjectCategoryId)).leftJoin(subjectCategories, eq(subjectsSubjectCategories.subjectCategoryId, subjectCategories.id)).leftJoin(subjects, eq(subjectsSubjectCategories.subjectId, subjects.id));
  if (row === undefined) return {};
  const s =  { ...row.subjectsSubjectCategory, subjectCategory: row.subjectCategory, subject: row.subject } ;
  return { subjectsSubjectCategory: s };
};


