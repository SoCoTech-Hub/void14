import type { SubjectCategoryId } from "@soco/subject-db/schema/subjectCategories";
import { eq } from "@soco/subject-db";
import { db } from "@soco/subject-db/client";
import {
  subjectCategories,
  subjectCategoryIdSchema,
} from "@soco/subject-db/schema/subjectCategories";

export const getSubjectCategories = async () => {
  const rows = await db.select().from(subjectCategories);
  const s = rows;
  return { subjectCategories: s };
};

export const getSubjectCategoryById = async (id: SubjectCategoryId) => {
  const { id: subjectCategoryId } = subjectCategoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(subjectCategories)
    .where(eq(subjectCategories.id, subjectCategoryId));
  if (row === undefined) return {};
  const s = row;
  return { subjectCategory: s };
};
