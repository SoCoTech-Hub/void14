import type {
  NewSchoolParams,
  SchoolId,
  UpdateSchoolParams,
} from "@soco/school-db/schema/schools";
import { eq } from "@soco/school-db";
import { db } from "@soco/school-db/client";
import {
  insertSchoolSchema,
  schoolIdSchema,
  schools,
  updateSchoolSchema,
} from "@soco/school-db/schema/schools";

export const createSchool = async (school: NewSchoolParams) => {
  const newSchool = insertSchoolSchema.parse(school);
  try {
    const [s] = await db.insert(schools).values(newSchool).returning();
    return { school: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSchool = async (
  id: SchoolId,
  school: UpdateSchoolParams,
) => {
  const { id: schoolId } = schoolIdSchema.parse({ id });
  const newSchool = updateSchoolSchema.parse(school);
  try {
    const [s] = await db
      .update(schools)
      .set(newSchool)
      .where(eq(schools.id, schoolId!))
      .returning();
    return { school: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSchool = async (id: SchoolId) => {
  const { id: schoolId } = schoolIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(schools)
      .where(eq(schools.id, schoolId!))
      .returning();
    return { school: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
